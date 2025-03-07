// SUT
import { expect } from "chai";
import { results } from "inversify-express-utils";
import { ProductsController } from "@/api/v1/controllers/product.controller";

// Mocks
import { ProductServiceMock } from "@/mocks/services/product.service";
import { ProductService } from "@/api/v1/services/product.service";

describe("ProductsService", () => {
  describe("#getEntities", () => {
    it("should return a collection of products", async () => {
      const sut = new ProductService({
        collection() {
          return {
            find() {
              return {
                toArray() {
                  return [];
                },
              };
            },
          };
        },
      } as any);

      const result = await sut.getEntities();
      expect(result).to.be.empty("string");
    });
  });
});
