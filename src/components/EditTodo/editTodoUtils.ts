import axios from '../../shared/axios';

import { ITodo } from './EditTodo';

export const utils = {
  updateTodo: async function (todoData: ITodo) {
    await axios.patch(`/todos/${todoData._id}`, todoData);
  },
};
