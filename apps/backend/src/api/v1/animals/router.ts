import { Router } from "express";
import { getDatabase } from "@/database/client";
import { AnimalModel } from "@/api/v1/animals/model";
import { AnimalController } from "@/api/v1/animals/controller";

export default function () {
  const router = Router();

  const controller = new AnimalController(
    //
    new AnimalModel(getDatabase()),
  );

  router.get("/animals", controller.getEntities.bind(controller));
  router.post("/animals", controller.createEntity.bind(controller));
  router.get("/animals/:id", controller.getEntity.bind(controller));
  router.delete("/animals/:id", controller.deleteEntity.bind(controller));

  return router;
}
