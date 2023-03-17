import { Todo } from "../store/express";

export type User = {
  id: number;
  username: string;
  todo : Todo
};
export type userUpdate = {
  username?: string;
  todo?: Todo;
};

type NewType = string;

export type Todos = {
  id: number;
  title: string;
  isDone: boolean;
  username: string;
  createdAt: string;
  upatedAt: string;
};
export type todosUpdate = {
  title?: string;
  isDone?: boolean;
  username?: string;
  upatedAt?: string;
};

