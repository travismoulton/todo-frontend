import { useEffect, useState } from 'react';
import { StringLiteralLike } from 'typescript';

import { utils } from './accordianTodosUtils';

const { fetchDueToday } = utils;

type Todo = {
  __v: number;
  _id: StringLiteralLike;
  category?: string;
  content?: string;
  createdAt: Date;
  dueDate?: string;
  priority?: string;
  title: string;
  user: string;
};

interface IState {
  todos: Todo[];
}

export default function AccordianTodos() {
  const [todos, setTodos] = useState<IState['todos']>([]);

  useEffect(() => {
    (async () => {
      const todos = await fetchDueToday();
      console.log(todos);
    })();
  });

  return (
    <ul>
      <li>
        <p>1</p>
      </li>
      <li>
        <p>1</p>
      </li>
      <li>
        <p>1</p>
      </li>
      <li>
        <p>1</p>
      </li>
    </ul>
  );
}
