import { Router } from "express";
import * as handler from "@/api/v1/users/handler";

export default function () {
  const router = Router();

  router.get("/users", handler.getUsers);
  router.post("/users", handler.createUser);
  router.get("/users/:id", handler.getUser);
  router.delete("/users/:id", handler.deleteUser);

  return router;
}
