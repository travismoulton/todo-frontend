import axios from '../../shared/axios';

export const utils = {
  logout: async function () {
    await axios.post('/users/logout');
  },
};
