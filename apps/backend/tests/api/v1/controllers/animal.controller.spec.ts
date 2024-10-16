// SUT
import { expect } from "chai";
import { AnimalController } from "@/api/v1/controllers/animal.controller";
import { results } from "inversify-express-utils";

// Mocks
import { MockAnimalService } from "@/mocks/services/animal.service";

describe("AnimalController", () => {
  let controller: AnimalController;

  beforeEach(() => {
    controller = new AnimalController(new MockAnimalService());
  });

  describe("#getEntities", () => {
    it("should respond with status code 200", async () => {
      const response = await controller.getEntities();

      expect(response).to.be.an.instanceof(results.JsonResult);
      expect(response.statusCode).to.equal(200);
    });
  });
});
