import axios from '../../shared/axios';

export const utils = {
  fetchDueToday: async function () {
    const { data } = await axios.get('/todos/due-today');

    return data;
  },

  fetchOverDue: async function () {
    const { data } = await axios.get('/todos/overdue');

    return data;
  },
};
