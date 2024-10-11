import { Router } from "express";
import { UserController } from "@/api/v1/users/controller";
import { UserModel } from "@/api/v1/users/model";
import { getDatabase } from "@/database/client";

export default function () {
  const router = Router();

  const controller = new UserController(
    //
    new UserModel(getDatabase()),
  );

  router.get("/users", controller.getEntities.bind(controller));
  router.post("/users", controller.createEntity.bind(controller));
  router.get("/users/:id", controller.getEntity.bind(controller));
  router.delete("/users/:id", controller.deleteEntity.bind(controller));

  return router;
}
