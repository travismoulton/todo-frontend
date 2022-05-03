import { List, Divider } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';

import AccordianTodoItem from '../AccordianTodoItem/AccordianTodoItem';
import { utils } from './accordianTodosUtils';
import { Todo } from '../../shared/types/todo';

const { fetchDueToday, fetchOverDue } = utils;

interface IState {
  todos: Todo[];
}

interface IProps {
  dueDate: 'Due Today' | 'Overdue';
}

export default function AccordianTodos({ dueDate }: IProps) {
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
      const fetchTodos = dueDate === 'Due Today' ? fetchDueToday : fetchOverDue;

      const { data } = await fetchTodos();
      setTodos(data);
    })();
  }, [dueDate]);

  const todoDisplay = todos.map((todo, i) => (
    <Fragment key={todo._id}>
      <AccordianTodoItem updateTodo={updateTodoHandler} todo={todo} />
      {/*Don't display the divider on the bottom list item */}
      {i !== todos.length - 1 && <Divider />}
    </Fragment>
  ));

  return <List sx={{ width: '100%' }}>{todoDisplay}</List>;
}
