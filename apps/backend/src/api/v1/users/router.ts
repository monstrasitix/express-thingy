import { Router } from "express";
import * as userHandler from "@/api/v1/users/handler";

export default function () {
  const router = Router();

  router.get("/users", userHandler.getUsers);
  router.post("/users", userHandler.createUser);
  router.get("/users/:id", userHandler.getUser);
  router.delete("/users/:id", userHandler.deleteUser);

  return router;
}
