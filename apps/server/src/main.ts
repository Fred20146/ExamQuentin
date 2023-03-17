import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { prismaClient } from "./prisma";
import {router as userRouter} from "./routes/user.router";
import {router as todoRouter} from "./routes/todo.router"

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const router = express.Router();
app.use("/users", userRouter);
app.use("/todo", todoRouter);

// app.get("/", (req, res) => {
//   res.json("Hello, World!");
// });

// app.get("/todos", async (req, res) => {
//   const todos = await prismaClient.todo.findMany();
//   res.json(todos);
// });

app.listen(3009, () => {
  console.log("3009");
});
