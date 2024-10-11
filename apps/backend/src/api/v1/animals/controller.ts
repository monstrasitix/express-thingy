import { AnimalRecord } from "@/database/collection";
import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { AnimalModel } from "./model";

export class AnimalController {
  constructor(
    //
    protected model: AnimalModel,
  ) {}

  async getEntities(req: Request, res: Response<AnimalRecord[]>) {
    try {
      res.status(200).json(await this.model.getAnimals());
    } catch {
      res.status(500).end();
    }
  }

  async getEntity(
    req: Request<{ id: string }>,
    res: Response<AnimalRecord | null>,
  ) {
    try {
      const animal = await this.model.findAnimal(req.params.id);

      if (animal === null) {
        res.status(404);
      } else {
        res.status(200).json(animal);
      }
    } catch {
      res.status(500).end();
    }
  }

  async createEntity(
    req: Request<null, null, Omit<AnimalRecord, "id">>,
    res: Response<{ id: ObjectId }>,
  ) {
    try {
      const result = await this.model.addAnimal(req.body);

      if (result.acknowledged) {
        res.status(201).json({ id: result.insertedId });
      } else {
        res.status(500).end();
      }
    } catch {
      res.status(500).end();
    }
  }

  async deleteEntity(req: Request<{ id: string }>) {
    await this.model.removeAnimal(req.params.id);
  }
}
