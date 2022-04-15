import axios from '../../shared/axios';
import { UserData, ErrorData } from './Register';

export const utils = {
  registerUser: async function (username: string, password: string) {
    const { data }: { data: UserData | ErrorData } = await axios
      .post('/users/signup', { name: username, password })
      .catch((err) => err.response);

    return data;
  },
};
