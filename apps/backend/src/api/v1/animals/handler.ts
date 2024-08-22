import { getDatabase } from "@/database/client";
import { Request, Response } from "express";

type Animal = {
  id: string;
  type: string;
  name: string;
};

export async function getAnimals(req: Request, res: Response<Animal[]>) {
  const db = getDatabase();

  res.json(await db.collection<Animal>("animals").find({}).toArray());
}

export async function getAnimal(
  req: Request<{ id: string }>,
  res: Response<Animal | null>,
) {
  const db = getDatabase();

  res.json(
    await db.collection<Animal>("animals").findOne({
      id: req.params.id,
    }),
  );
}

export async function createAnimal(
  req: Request<null, null, Omit<Animal, "id">>,
  res: Response<Animal>,
) {
  const db = getDatabase();

  const newAnimal: Animal = {
    id: Math.random().toString(),
    ...req.body,
  };

  await db.collection<Animal>("animals").insertOne(newAnimal);
  res.json(newAnimal);
}

export async function deleteAnimal(req: Request<{ id: string }>) {
  const db = getDatabase();

  await db.collection<Animal>("animals").deleteOne({
    id: req.params.id,
  });
}
