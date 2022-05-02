import axios from '../../shared/axios';

export const utils = {
  toggleTodoComplete: async function (todoId: string, isFinished: boolean) {
    const { data } = await axios.patch(`/todos/${todoId}`, { isFinished });

    return data;
  },
};
