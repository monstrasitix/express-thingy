// Express
import { type Express, static as staticAssets } from "express";

// Middleware
import cors from "cors";
import bodyParser from "body-parser";

// Dependency Injection
import { container } from "@/di/injection";
import { InversifyExpressServer } from "inversify-express-utils";

type ServerConfig = {
  port: string;
};

export function setupServer(app: Express, config: ServerConfig) {
  app.use(bodyParser.json());
  app.use(cors({ methods: ["GET"] }));
  app.use("/static", staticAssets("./public"));

  new InversifyExpressServer(container, null, null, app)
    .build()
    .listen(config.port, function () {
      console.log(`Listening on: http://localhost:${config.port}`);
    });
}
