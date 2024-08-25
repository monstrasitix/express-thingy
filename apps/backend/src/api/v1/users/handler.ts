import { getDatabase } from "@/database/client";
import { Request, Response } from "express";

type User = {
  id: string;
  firstName: string;
  lastName: string;
};

export async function getUsers(req: Request, res: Response<User[]>) {
  const db = getDatabase();

  res.json(await db.collection<User>("users").find({}).toArray());
}

export async function getUser(
  req: Request<{ id: string }>,
  res: Response<User | null>,
) {
  const db = getDatabase();

  res.json(
    await db.collection<User>("users").findOne({
      id: req.params.id,
    }),
  );
}

export async function createUser(
  req: Request<null, null, User>,
  res: Response<User>,
) {
  const db = getDatabase();

  await db.collection<User>("users").insertOne(req.body);
  res.json(req.body);
}

export async function deleteUser(req: Request<{ id: string }>) {
  const db = getDatabase();

  await db.collection<User>("users").deleteOne({
    id: req.params.id,
  });
}
