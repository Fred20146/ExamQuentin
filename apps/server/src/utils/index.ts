import { Prisma } from "@prisma/client";
import { Response } from "express";

export function getIdOrVoid(id: string, res: Response): number | void {
  const parsedId = parseInt(id);
  if (!parsedId) {
    res.json({ error: "Id can't be parsed into number..." });
    return;
  } else {
    return parsedId;
  }
}

export function handlePrismaError(error: unknown, res: Response) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if ((error.code = "P2002")) {
      res.json({
        message:
          "Firstname or Lastname already exists in database... Try another Firstname or Lastname",
      });
    } else {
      res.json(error.message);
    }
  } else {
    res.json(error);
  }
}
