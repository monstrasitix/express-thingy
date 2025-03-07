import { IProductService } from "@/api/v1/interfaces/product.interface";

export class ProductServiceMock implements IProductService {
  public getEntities() {
    return [];
  }
}
