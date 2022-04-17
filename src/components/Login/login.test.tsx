import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { waitFor, screen, render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';

import Login from './Login';
import { mockSuccessData, mockFailedData } from '../../shared/testMocks/mockUser';
import { utils } from './loginUtils';

jest.mock('./loginUtils');

describe('<Login />', () => {
  type spy = jest.SpyInstance<Promise<any>, [username: string, password: string]>;
  let mockLoginUser: spy | null;

  beforeEach(() => {
    mockLoginUser = jest.spyOn(utils, 'loginUser');
  });

  afterEach(() => {
    jest.clearAllMocks();
    mockLoginUser = null;
  });

  async function setup() {
    const history = createMemoryHistory();

    await waitFor(() => {
      // eslint-disable-next-line testing-library/no-wait-for-side-effects
      render(
        <HistoryRouter history={history}>
          <Login />
        </HistoryRouter>
      );
    });

    return history;
  }

  test('renders', async () => {
    await setup();

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Your name:')).toBeInTheDocument();
    expect(screen.getByText('Your password:')).toBeInTheDocument();
  });

  test('calls the API if all fields are filled out, and rediects to the homepage', async () => {
    const history = await setup();

    // Set path to login so we can test later that the component updates the URL
    await waitFor(() => history.push('/login'));
    expect(history.location.pathname).toEqual('/login');

    fireEvent.change(screen.getByLabelText('Your name:'), {
      target: { value: 'Travis' },
    });

    fireEvent.change(screen.getByLabelText('Your password:'), {
      target: { value: 'Password' },
    });

    fireEvent.click(screen.getByRole('button'));

    mockLoginUser?.mockReturnValue(Promise.resolve(mockSuccessData));

    await waitFor(() => expect(mockLoginUser).toBeCalled());

    // After the user is logged in, the user will be updated in the store,
    // which will cause the aopp to go back to the homepage
    expect(history.location.pathname).toEqual('/');
  });

  test('does not make api call if a form field is empty', async () => {
    await setup();

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => expect(mockLoginUser).not.toBeCalled());

    // Check that error messages are displayed
    expect(screen.getByText('Username is required')).toBeInTheDocument();
    expect(screen.getByText('Password is required')).toBeInTheDocument();
  });

  test('displays error message if API returns a failed request', async () => {
    await setup();

    fireEvent.change(screen.getByLabelText('Your name:'), {
      target: { value: 'Travis' },
    });

    fireEvent.change(screen.getByLabelText('Your password:'), {
      target: { value: 'Password' },
    });

    mockLoginUser?.mockReturnValue(Promise.resolve(mockFailedData));

    fireEvent.click(screen.getByRole('button'));

    // eslint-disable-next-line testing-library/prefer-find-by
    await waitFor(() => expect(screen.getByText('Mock message')).toBeInTheDocument());
  });
});
