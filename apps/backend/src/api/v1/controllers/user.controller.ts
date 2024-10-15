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
import { UserService } from "@/api/v1/services/user.service";
import { UserRecord } from "@/database/collection";

@controller("/api/v1/users")
export class UserController {
  constructor(
    //
    @inject(TYPES.UserService) public model: UserService,
  ) {}

  @httpGet("/")
  async getEntities(@response() res: Response<UserRecord[]>) {
    try {
      res.status(200).json(await this.model.getUsers());
    } catch {
      res.status(500).end();
    }
  }

  @httpGet("/:id")
  async getEntity(
    @request() req: Request<{ id: string }>,
    @response() res: Response<UserRecord | null>,
  ) {
    try {
      const user = await this.model.findUser(req.params.id);

      if (user === null) {
        res.status(404);
      } else {
        res.status(200).json(user);
      }
    } catch {
      res.status(500).end();
    }
  }

  @httpPost("/")
  async createEntity(
    @request() req: Request<null, null, Omit<UserRecord, "id">>,
    @response() res: Response<{ id: ObjectId }>,
  ) {
    try {
      const result = await this.model.addUser(req.body);

      if (result.acknowledged) {
        res.status(201).json({ id: result.insertedId });
      } else {
        res.status(500).end();
      }
    } catch {
      res.status(500).end();
    }
  }

  @httpDelete("/:id")
  async deleteEntity(@request() req: Request<{ id: string }>) {
    await this.model.removeUser(req.params.id);
  }
}
