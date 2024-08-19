import type { Express } from "express";
import * as userHandler from "@/api/handler/users";

export function setupRouter(app: Express) {
  app.get("/api/v1/users", userHandler.getUsers);
  app.post("/api/v1/users", userHandler.createUser);
  app.get("/api/v1/users/:id", userHandler.getUser);
  app.delete("/api/v1/users/:id", userHandler.deleteUser);
}
