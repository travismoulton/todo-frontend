import { MemoryRouter } from 'react-router-dom';
import { waitFor, screen, render, fireEvent } from '@testing-library/react';

import Login from './Login';
import { UserData } from './Login';
import { utils } from './loginUtils';

jest.mock('./loginUtils');

const mockData: UserData = {
  status: 'success',
  data: {
    user: {
      name: 'Travis',
      __v: '1',
      id: '1',
      _id: '1',
      password: 'password',
    },
  },
};

describe('<Login />', () => {
  type spy = jest.SpyInstance<Promise<any>, [username: string, password: string]>;
  let mockLoginUser: spy | null;

  beforeEach(() => {
    mockLoginUser = jest
      .spyOn(utils, 'loginUser')
      .mockReturnValue(Promise.resolve(mockData));
  });

  afterEach(() => {
    jest.clearAllMocks();
    mockLoginUser = null;
  });

  test('calls the API if all fields are filled out, and rediects to the homepage', async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Your name:'), {
      target: { value: 'Travis' },
    });

    fireEvent.change(screen.getByLabelText('Your password:'), {
      target: { value: 'Travis' },
    });

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => expect(mockLoginUser).toBeCalled());
  });

  test('does not make api call if a form field is empty', async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => expect(mockLoginUser).not.toBeCalled());
  });
});
