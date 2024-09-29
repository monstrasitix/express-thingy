import { getDatabase } from "@/database/client";
import { getCollection, AnimalRecord } from "@/database/collection";
import { Request, Response } from "express";
import { ObjectId } from "mongodb";

export async function getAnimals(req: Request, res: Response<AnimalRecord[]>) {
  const db = getDatabase();
  const query = getCollection(db, "animals").find({});

  try {
    res.status(200).json(await query.toArray());
  } catch {
    res.status(500).end();
  }
}

export async function getAnimal(
  req: Request<{ id: string }>,
  res: Response<AnimalRecord | null>,
) {
  const db = getDatabase();

  try {
    const record = await getCollection(db, "animals").findOne({
      id: req.params.id,
    });

    if (record === null) {
      res.status(404);
    } else {
      res.status(200).json(record);
    }
  } catch {
    res.status(500).end();
  }
}

export async function createAnimal(
  req: Request<null, null, Omit<AnimalRecord, "id">>,
  res: Response<{ id: ObjectId }>,
) {
  const db = getDatabase();
  const collection = getCollection(db, "animals");

  try {
    const result = await collection.insertOne(req.body);

    if (result.acknowledged) {
      res.status(201).json({ id: result.insertedId });
    } else {
      res.status(500).end();
    }
  } catch {
    res.status(500).end();
  }
}

export async function deleteAnimal(req: Request<{ id: string }>) {
  const db = getDatabase();

  await getCollection(db, "animals").deleteOne({
    id: req.params.id,
  });
}
