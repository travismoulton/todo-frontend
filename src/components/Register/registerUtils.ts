import axios from '../../shared/axios';

export const utils = {
  registerUser: async function (username: string, password: string) {
    const { data } = await axios.post('/users/signup', { name: username, password });

    return data;
  },
};
