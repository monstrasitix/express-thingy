// Dependencies
import { ObjectId } from "mongodb";
import { Request, Response } from "express";

// Dependency Injection
import { TYPES } from "@/di/types";
import { inject } from "inversify";
import {
  controller,
  httpDelete,
  httpGet,
  httpPost,
  request,
  response,
} from "inversify-express-utils";

// Services
import { AnimalService } from "@/api/v1/services/animal.service";
import { AnimalRecord } from "@/database/collection";

@controller("/api/v1/animals")
export class AnimalController {
  constructor(
    //
    @inject(TYPES.AnimalService) protected animals: AnimalService,
  ) {}

  @httpGet("/")
  async getEntities(@response() res: Response<AnimalRecord[]>) {
    try {
      res.status(200).json(await this.animals.getAnimals());
    } catch {
      res.status(500).end();
    }
  }

  @httpGet("/:id")
  async getEntity(
    @request() req: Request<{ id: string }>,
    @response() res: Response<AnimalRecord | null>,
  ) {
    try {
      const animal = await this.animals.findAnimal(req.params.id);

      if (animal === null) {
        res.status(404).end();
      } else {
        res.status(200).json(animal);
      }
    } catch {
      res.status(500).end();
    }
  }

  @httpPost("/")
  async createEntity(
    @request() req: Request<null, null, Omit<AnimalRecord, "id">>,
    @response() res: Response<{ id: ObjectId }>,
  ) {
    try {
      const result = await this.animals.addAnimal(req.body);

      if (result.acknowledged) {
        res.status(201).json({ id: result.insertedId });
      } else {
        res.status(500).end();
      }
    } catch {
      res.status(500).end();
    }
  }

  @httpDelete("/")
  async deleteEntity(@request() req: Request<{ id: string }>) {
    await this.animals.removeAnimal(req.params.id);
  }
}
