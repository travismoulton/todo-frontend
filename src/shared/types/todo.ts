export type Todo = {
  __v: number;
  _id: string;
  category: string | null;
  content: string;
  createdAt: Date;
  dueDate: string;
  dueDateStr: number;
  priority: string | null;
  title: string;
  user: string;
  isFinished: boolean;
};
