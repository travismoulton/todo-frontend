import { List, Divider } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';

import AccordianTodoItem from '../AccordianTodoItem/AccordianTodoItem';
import { utils } from './accordianTodosUtils';

const { fetchDueToday } = utils;

export type Todo = {
  __v: number;
  _id: string;
  category?: string;
  content?: string;
  createdAt: Date;
  dueDate?: string;
  priority?: string;
  title: string;
  user: string;
  isFinished: boolean;
};

interface IState {
  todos: Todo[];
}

export default function AccordianTodos() {
  const [todos, setTodos] = useState<IState['todos']>([]);

  function updateTodoHandler(updatedTodo: Todo) {
    const todoIndex = todos.indexOf(updatedTodo);

    // Copy the array, and update the desired todo in place
    const updatedTodos = [...todos];
    updatedTodos.splice(todoIndex, 1, updatedTodo);

    setTodos(updatedTodos);
  }

  useEffect(() => {
    (async () => {
      const { data } = await fetchDueToday();
      setTodos(data);
    })();
  }, []);

  const todoDisplay = todos.map((todo, i) => (
    <Fragment key={todo._id}>
      <AccordianTodoItem updateTodo={updateTodoHandler} todo={todo} />
      {/*Don't display the divider on the bottom list item */}
      {i !== todos.length - 1 && <Divider />}
    </Fragment>
  ));

  return <List sx={{ width: '100%' }}>{todoDisplay}</List>;
}
