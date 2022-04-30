import axios from './shared/axios';

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

export type ErrorData = {
  status: 'fail';
  data: {
    message: string;
  };
};

export const utils = {
  checkForUser: async function () {
    const { data }: { data: UserData | ErrorData } = await axios.get(
      '/users/checkForUser'
    );

    return data;
  },
};
