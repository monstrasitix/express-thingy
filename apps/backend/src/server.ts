import cors from "cors";
import bodyParser from "body-parser";
import type { Express } from "express";

import apiV1 from "@/api/v1";

type ServerConfig = {
  port: string;
};

export function setupServer(app: Express, config: ServerConfig) {
  app.use(bodyParser.json());
  app.use(cors({ methods: ["GET"] }));

  apiV1(app);

  app.listen(config.port, function () {
    console.log(`Listening on: http://localhost:${config.port}`);
  });
}
