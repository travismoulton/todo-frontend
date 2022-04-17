/* eslint-disable testing-library/no-wait-for-side-effects */
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { waitFor, screen, render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';

import { mockSuccessData, mockFailedData } from '../../shared/testMocks/mockUser';
import Register from './Register';
import { utils } from './registerUtils';

jest.mock('./registerUtils');

describe('<Register />', () => {
  type spy = jest.SpyInstance<Promise<any>, [username: string, password: string]>;
  let mockRegisterUser: spy | null;

  beforeEach(() => {
    mockRegisterUser = jest.spyOn(utils, 'registerUser');
  });

  afterEach(() => {
    jest.clearAllMocks();
    mockRegisterUser = null;
  });

  async function setup() {
    const history = createMemoryHistory();

    await waitFor(() => {
      render(
        <HistoryRouter history={history}>
          <Register />
        </HistoryRouter>
      );
    });

    return history;
  }

  test('renders', async () => {
    await setup();

    expect(screen.getByText('Register')).toBeInTheDocument();
    expect(screen.getByText('Your name:')).toBeInTheDocument();
    expect(screen.getByText('Your password:')).toBeInTheDocument();
    expect(screen.getByText('Confirm Password:')).toBeInTheDocument();
  });

  test('makes api call if form is valid', async () => {
    const history = await setup();

    // Set URL to /register we can test desired component behavior later
    await waitFor(() => history.push('/register'));
    expect(history.location.pathname).toEqual('/register');

    fireEvent.change(screen.getByLabelText('Your name:'), {
      target: { value: 'Travis' },
    });

    fireEvent.change(screen.getByLabelText('Your password:'), {
      target: { value: 'password' },
    });

    fireEvent.change(screen.getByLabelText('Confirm Password:'), {
      target: { value: 'password' },
    });

    mockRegisterUser?.mockReturnValue(Promise.resolve(mockSuccessData));

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => expect(mockRegisterUser).toBeCalled());

    // After the user is registered they will be added to the store which
    // triggers the component to navigate to the homepage
    expect(history.location.pathname).toEqual('/');
  });

  test('does not make api call if form is empty', async () => {
    await setup();

    await waitFor(() => fireEvent.click(screen.getByRole('button')));

    expect(mockRegisterUser).not.toBeCalled();
    expect(screen.getByText('A username is required')).toBeInTheDocument();
    expect(screen.getByText('A password is required')).toBeInTheDocument();
  });

  test('does not make api call if password is less than 8 characters', async () => {
    await setup();

    fireEvent.change(screen.getByLabelText('Your name:'), {
      target: { value: 'Travis' },
    });

    fireEvent.change(screen.getByLabelText('Your password:'), {
      target: { value: 'Passwor' },
    });

    await waitFor(() => fireEvent.click(screen.getByRole('button')));

    expect(mockRegisterUser).not.toBeCalled();
    expect(
      screen.getByText('Password must be at least 8 characters')
    ).toBeInTheDocument();
  });

  test('does not make api call if passwords dont match', async () => {
    await setup();

    fireEvent.change(screen.getByLabelText('Your name:'), {
      target: { value: 'Travis' },
    });

    fireEvent.change(screen.getByLabelText('Your password:'), {
      target: { value: 'Password' },
    });

    await waitFor(() => fireEvent.click(screen.getByRole('button')));

    expect(mockRegisterUser).not.toBeCalled();
    expect(screen.getByText('Passwords dont match')).toBeInTheDocument();
  });

  test('displays error message if api call returns one', async () => {
    await setup();

    fireEvent.change(screen.getByLabelText('Your name:'), {
      target: { value: 'Travis' },
    });

    fireEvent.change(screen.getByLabelText('Your password:'), {
      target: { value: 'password' },
    });

    fireEvent.change(screen.getByLabelText('Confirm Password:'), {
      target: { value: 'password' },
    });

    mockRegisterUser?.mockReturnValue(Promise.resolve(mockFailedData));

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => expect(mockRegisterUser).toBeCalled());

    expect(screen.getByText('Mock message')).toBeInTheDocument();
  });
});
