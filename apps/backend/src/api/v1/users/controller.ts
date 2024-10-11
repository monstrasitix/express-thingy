import { UserRecord } from "@/database/collection";
import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { UserModel } from "@/api/v1/users/model";

export class UserController {
  constructor(
    //
    protected model: UserModel,
  ) {}

  async getEntities(req: Request, res: Response<UserRecord[]>) {
    try {
      res.status(200).json(await this.model.getUsers());
    } catch {
      res.status(500).end();
    }
  }

  async getEntity(
    req: Request<{ id: string }>,
    res: Response<UserRecord | null>,
  ) {
    try {
      const user = await this.model.findUSer(req.params.id);

      if (user === null) {
        res.status(404);
      } else {
        res.status(200).json(user);
      }
    } catch {
      res.status(500).end();
    }
  }

  async createEntity(
    req: Request<null, null, Omit<UserRecord, "id">>,
    res: Response<{ id: ObjectId }>,
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

  async deleteEntity(req: Request<{ id: string }>) {
    await this.model.removeUser(req.params.id);
  }
}
