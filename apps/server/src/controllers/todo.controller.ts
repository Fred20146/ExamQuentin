import { Request, Response } from "express";
import { TodoService } from "../services/todo.service";
import { getIdOrVoid, handlePrismaError } from "../utils/index";


const todoService = new TodoService();

export class TodoController {
  async getTodo(_req: Request, res: Response) {
    try {
      const todos = await todoService.getTodo();
      res.json(todos);
    } catch (error: unknown) {
      handlePrismaError(error, res);
    }
  }

  async getTodoByUsername(req: Request, res: Response) {
    const username = req.params.username;
    if (username) {
      try {
        const todo = await todoService.getTodoByUsername(username);
        if (todo) {
          res.json(todo);
        } else {
          res.json({ message: "Todo not found for this id..." });
        }
      } catch (error: unknown) {
        handlePrismaError(error, res);
      }
    }
  }
  async getTodoById(req: Request, res: Response) {
    const id = getIdOrVoid(req.params.id, res);
    if (id) {
      try {
        const todo = await todoService.getTodoById(id);
        if (todo) {
          res.json(todo);
        } else {
          res.json({ message: "Todo not found for this id..." });
        }
      } catch (error: unknown) {
        handlePrismaError(error, res);
      }
    }
  }

  async createTodo(req: Request, res: Response) {
    try {
      const newTodo = await todoService.createTodo(req.body);
      res.json(newTodo);
    } catch (error: unknown) {
      handlePrismaError(error, res);
    }
  }

  async updateTodo(req: Request, res: Response) {
    const id = getIdOrVoid(req.params.id, res);
    if (id) {
      try {
        const doesTodoExist = await todoService.checkIfTodoExists(
          id
        );
        if (doesTodoExist) {
          const updatedTodo = await todoService.updateTodo(
            id,
            req.body
          );
          res.json(updatedTodo);
        } else {
          res.json({ message: "Todo not found for this id..." });
        }
      } catch (error: unknown) {
        handlePrismaError(error, res);
      }
    }
  }

  async deleteTodo(req: Request, res: Response) {
    const id = getIdOrVoid(req.params.id, res);
    if (id) {
      try {
        const doesTodoExist = await todoService.checkIfTodoExists(
          id
        );
        if (doesTodoExist) {
          const deletedTodo = await todoService.deleteTodo(id);
          res.json(deletedTodo);
        } else {
          res.json({ message: "TododeletedTodo not found for this id..." });
        }
      } catch (error: unknown) {
        handlePrismaError(error, res);
      }
    }
  }

  async toggleStatus(req: Request, res: Response) {
    const id = getIdOrVoid(req.params.id, res);
    if (id) {
      try {
        const todo = await todoService.getTodoById(id);
        if (todo) {
          const updatedTodo = await todoService.toggleStatus(id, todo.isDone);
          res.json(updatedTodo);
        } else {
          res.json({ message: "Todo not found for this id..." });
        }
      } catch (error: unknown) {
        handlePrismaError(error, res);
      }
    }
  }
}
