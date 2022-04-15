import axios from '../../shared/axios';

export const utils = {
  loginUser: async function (username: string, password: string) {
    const { data } = await axios
      .post('/users/login', { name: username, password })
      .catch((err) => err.Response);

    return data;
  },
};
