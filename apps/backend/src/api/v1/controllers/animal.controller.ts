// Dependencies
import { ObjectId } from "mongodb";
import { Response } from "express";

// Dependency Injection
import { TYPES } from "@/di/types";
import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpDelete,
  httpGet,
  httpPost,
  requestBody,
  requestParam,
  response,
} from "inversify-express-utils";

// Services
import { AnimalRecord } from "@/database/collection";
import { IAnimalService } from "@/api/v1/interfaces/animal.service";

@controller("/api/v1/animals")
export class AnimalController extends BaseHttpController {
  constructor(
    //
    @inject(TYPES.AnimalService) protected animals: IAnimalService,
  ) {
    super();
  }

  @httpGet("/")
  async getEntities() {
    return this.json(await this.animals.getAnimals(), 200);
  }

  @httpGet("/:id")
  async getEntity(@requestParam("id") id: string) {
    try {
      const animal = await this.animals.findAnimal(id);

      if (animal === null) {
        return this.notFound();
      } else {
        return this.json(animal, 200);
      }
    } catch {
      return this.badRequest();
    }
  }

  @httpPost("/")
  async createEntity(
    @requestBody() animal: AnimalRecord,
    @response() res: Response<{ id: ObjectId }>,
  ) {
    try {
      const result = await this.animals.addAnimal(animal);

      if (result.acknowledged) {
        return this.json({ id: result.insertedId }, 201);
      } else {
        return this.badRequest();
      }
    } catch {
      return this.badRequest();
    }
  }

  @httpDelete("/")
  async deleteEntity(@requestParam("id") id: string) {
    await this.animals.removeAnimal(id);
    return this.ok();
  }
}
