import { inject, injectable } from "inversify";
import { IProductService } from "@/api/v1/interfaces/product.interface";
import { TYPES } from "@/di/types";
import { Db } from "mongodb";
import { getCollection } from "@/database/collection";

@injectable()
export class ProductService implements IProductService {
  constructor(
    //
    @inject(TYPES.Mongo) private readonly db: Db,
  ) {}

  public async getEntities(): Promise<any> {
    const cursor = getCollection(this.db, "products").find({});
    return cursor.toArray();
  }
}
