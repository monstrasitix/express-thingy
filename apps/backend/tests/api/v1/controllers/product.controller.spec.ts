// SUT
import { expect } from "chai";
import { results } from "inversify-express-utils";
import { ProductsController } from "@/api/v1/controllers/product.controller";

// Mocks
import { ProductServiceMock } from "@/mocks/services/product.service";

describe("ProductsController", () => {
  let controller: ProductsController;

  beforeEach(() => {
    controller = new ProductsController(new ProductServiceMock());
  });

  describe("#index", () => {
    it("should respond with status code 200", async () => {
      const response = await controller.index();

      expect(response).to.be.an.instanceof(results.JsonResult);
      expect(response.statusCode).to.equal(200);
    });
  });
});
