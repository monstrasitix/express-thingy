// DI
import { inject } from "inversify";
import { TYPES } from "@/di/types";
import {
  BaseHttpController,
  controller,
  httpGet,
} from "inversify-express-utils";

// Interfaces
import { IProductService } from "@/api/v1/interfaces/product.interface";

@controller("/api/v1/products")
export class ProductsController extends BaseHttpController {
  constructor(
    //
    @inject(TYPES.ProductService) private readonly products: IProductService,
  ) {
    super();
  }

  @httpGet("/")
  public async index() {
    return this.json(await this.products.getEntities(), 200);
  }
}
