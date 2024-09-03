import { getDatabase } from "@/database/client";
import { getCollection, User } from "@/database/collection";
import { Request, Response } from "express";

export async function getUsers(req: Request, res: Response<User[]>) {
  const db = getDatabase();

  res.json(await getCollection(db, "users").find({}).toArray());
}

export async function getUser(
  req: Request<{ id: string }>,
  res: Response<User | null>,
) {
  const db = getDatabase();

  res.json(
    await getCollection(db, "users").findOne({
      id: req.params.id,
    }),
  );
}

export async function createUser(
  req: Request<null, null, User>,
  res: Response<User>,
) {
  const db = getDatabase();

  await getCollection(db, "users").insertOne(req.body);
  res.json(req.body);
}

export async function deleteUser(req: Request<{ id: string }>) {
  const db = getDatabase();

  await getCollection(db, "users").deleteOne({
    id: req.params.id,
  });
}
