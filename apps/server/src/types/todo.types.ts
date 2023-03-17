export type CreateTodo = {
  id: number;
  title: string;
  isDone: boolean | null;
  username: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UpdateTodo = {
  id: number;
  title: string;
  isDone: boolean | null;
  username: string;
  createdAt: Date;
  updatedAt: Date;
};
