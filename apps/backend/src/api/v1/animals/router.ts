import { Router } from "express";
import * as handler from "@/api/v1/animals/handler";

export default function () {
  const router = Router();

  router.get("/animals", handler.getAnimals);
  router.post("/animals", handler.createAnimal);
  router.get("/animals/:id", handler.getAnimal);
  router.delete("/animals/:id", handler.deleteAnimal);

  return router;
}
