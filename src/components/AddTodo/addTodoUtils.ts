import axios from '../../shared/axios';
import { ITodo } from './AddTodo';

export const utils = {
  addTodo: async function (todo: ITodo) {
    return await axios.post('/todos', todo);
  },
};
