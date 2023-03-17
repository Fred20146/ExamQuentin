import { User } from "@prisma/client";
import { prismaClient } from "../prisma";
import { CreateUser, UpdateUser } from "../types/user.types";

export class UserService {
  async getUsers(): Promise<User[]> {
    const users = await prismaClient.user.findMany({
      // include: {
      //   messages: true,
      // },
    });
    return users;
  }

  async getUserById(id: number): Promise<User | null> {
    const user = await prismaClient.user.findFirst({
      where: { id },
      //   include: { messages: true },
    });
    return user;
  }

  async checkIfUserExists(id: number): Promise<boolean> {
    return (await prismaClient.user.findFirst({ where: { id } }))
      ? true
      : false;
  }

  async createUser(data: CreateUser): Promise<User | null> {
    const createdUser = await prismaClient.user.create({
      data,
    });
    return createdUser;
  }

  async updateUser(id: number, data: UpdateUser): Promise<User | null> {
    const updatedUser = await prismaClient.user.update({
      where: { id },
      data,
    });
    return updatedUser;
  }

  async deleteUser(id: number): Promise<User | null> {
    const deletedUser = await prismaClient.user.delete({ where: { id } });
    return deletedUser;
  }

  
}
