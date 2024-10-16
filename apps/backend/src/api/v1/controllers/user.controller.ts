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
} from "inversify-express-utils";

// Services
import { UserRecord } from "@/database/collection";
import { IUserService } from "@/api/v1/interfaces/user.service";

@controller("/api/v1/users")
export class UserController extends BaseHttpController {
  constructor(
    //
    @inject(TYPES.UserService) public model: IUserService,
  ) {
    super();
  }

  @httpGet("/")
  async getEntities() {
    return this.json(await this.model.getUsers(), 200);
  }

  @httpGet("/:id")
  async getEntity(@requestParam("id") id: string) {
    try {
      const user = await this.model.findUser(id);

      if (user === null) {
        return this.notFound();
      } else {
        return this.json(user, 200);
      }
    } catch {
      return this.badRequest();
    }
  }

  @httpPost("/")
  async createEntity(@requestBody() user: UserRecord) {
    try {
      const result = await this.model.addUser(user);

      if (result.acknowledged) {
        return this.json({ id: result.insertedId }, 201);
      } else {
        return this.badRequest();
      }
    } catch {
      return this.badRequest();
    }
  }

  @httpDelete("/:id")
  async deleteEntity(@requestParam("id") id: string) {
    await this.model.removeUser(id);
    return this.ok();
  }
}
