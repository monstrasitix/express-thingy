import { Db } from "mongodb";
import { Container } from "inversify";

// Dependency Injection
import { TYPES } from "@/di/types";

// Constants
import { getDatabase } from "@/database/client";

// Services
import { ProductService } from "@/api/v1/services/product.service";
import { IProductService } from "@/api/v1/interfaces/product.interface";

export const container = new Container();

container.bind<Db>(TYPES.Mongo).toConstantValue(getDatabase());
container.bind<IProductService>(TYPES.ProductService).to(ProductService);
