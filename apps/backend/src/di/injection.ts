// Dependencies
import { Db } from "mongodb";
import { Container } from "inversify";

// Dependency Injection
import { TYPES } from "@/di/types";

// Constants
import { getDatabase } from "@/database/client";

// Services
import { UserService } from "@/api/v1/services/user.service";
import { AnimalService } from "@/api/v1/services/animal.service";

export const container = new Container();

container.bind<Db>(TYPES.Mongo).toConstantValue(getDatabase());
container.bind<UserService>(TYPES.UserService).to(UserService);
container.bind<AnimalService>(TYPES.AnimalService).to(AnimalService);
