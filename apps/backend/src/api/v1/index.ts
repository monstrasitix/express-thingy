import { type Express } from "express";

import userRouter from "@/api/v1/users/router";
import animalRouter from "@/api/v1/animals/router";

export default (app: Express) => {
  app.use("/api/v1", userRouter(), animalRouter());
};
