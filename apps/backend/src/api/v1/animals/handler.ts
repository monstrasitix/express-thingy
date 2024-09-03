import { getDatabase } from "@/database/client";
import { getCollection, Animal } from "@/database/collection";
import { Request, Response } from "express";

export async function getAnimals(req: Request, res: Response<Animal[]>) {
  const db = getDatabase();

  res.json(await getCollection(db, "animals").find({}).toArray());
}

export async function getAnimal(
  req: Request<{ id: string }>,
  res: Response<Animal | null>,
) {
  const db = getDatabase();

  res.json(
    await getCollection(db, "animals").findOne({
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

  await getCollection(db, "animals").insertOne(newAnimal);
  res.json(newAnimal);
}

export async function deleteAnimal(req: Request<{ id: string }>) {
  const db = getDatabase();

  await getCollection(db, "animals").deleteOne({
    id: req.params.id,
  });
}
