import { map } from "nanostores";
import { Todo } from "./express";

export type User = {
  id?: string;
  username?: string;
  todo: Todo;
  
  
};

export const user = map<User>();



