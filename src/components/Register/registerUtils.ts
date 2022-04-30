import axios from '../../shared/axios';

export type ErrorData = {
  status: 'fail';
  data: {
    message: string;
  };
};

export type UserData = {
  status: 'success';
  data: {
    user: {
      name: string;
      __v: string;
      id: string;
      _id: string;
      password: string;
    };
  };
};

export const utils = {
  registerUser: async function (username: string, password: string) {
    const { data }: { data: UserData | ErrorData } = await axios
      .post('/users/signup', { name: username, password })
      .catch((err) => err.response);

    return data;
  },
};
