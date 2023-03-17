import { Todo } from "@prisma/client";
import { prismaClient } from "../prisma";
import { CreateTodo, UpdateTodo } from "../types/todo.types";

export class TodoService {
  async getTodo(): Promise<Todo[]> {
    const vehicules = await prismaClient.todo.findMany({
      // include: {
      //   messages: true,
      // },
    });
    return vehicules;
  }

  async getTodoByUsername(username: string): Promise<Todo | null> {
    const todos = await prismaClient.todo.findFirst({
      where: { username },
      //   include: { messages: true },
    });
    return todos;
  }
  async getTodoById(id: number): Promise<Todo | null> {
    const todo = await prismaClient.todo.findFirst({
      where: { id },
      //   include: { messages: true },
    });
    return todo;
  }

  async checkIfTodoExists(id: number): Promise<boolean> {
    return (await prismaClient.todo.findFirst({ where: { id } }))
      ? true
      : false;
  }

  async createTodo(data: CreateTodo): Promise<Todo | null> {
    const createdTodo = await prismaClient.todo.create({
      data,
    });
    return createdTodo;
  }

  async updateTodo(
    id: number,
    data: UpdateTodo
  ): Promise<Todo | null> {
    const updatedTodo = await prismaClient.todo.update({
      where: { id },
      data,
    });
    return updatedTodo;
  }

  async deleteTodo(id: number): Promise<Todo| null> {
    const deletedTodo = await prismaClient.todo.delete({
      where: { id },
    });
    return deletedTodo;
  }
  async toggleStatus(
    id: number,
    isDone: boolean
  ): Promise<Todo | null> {
    const updatedTodo = await prismaClient.todo.update({
      where: { id },
      data: {
        isDone: isDone ? false : true,
      },
    });
    return updatedTodo;
  }
}
