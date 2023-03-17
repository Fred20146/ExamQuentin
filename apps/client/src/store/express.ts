import { map } from "nanostores";


export type Todo = {
    id?: string;
    title?: string;
    isDone?: boolean;
    createdAt?: string;
    updatedAt?: string;
    
  };

  
  export const user = map<Todo>();