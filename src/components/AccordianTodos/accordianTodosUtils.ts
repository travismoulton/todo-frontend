import axios from '../../shared/axios';

export const utils = {
  fetchTodos: async function () {
    const { data } = await axios.get('/todos/due-today');

    return data;
  },
};
