// SUT
import { expect } from "chai";
import { UserController } from "@/api/v1/controllers/user.controller";
import { results } from "inversify-express-utils";

// Mocks
import { MockUserService } from "@/mocks/services/user.service";

describe("UserController", () => {
  let controller: UserController;

  beforeEach(() => {
    controller = new UserController(new MockUserService());
  });

  describe("#getEntities", () => {
    it("should respond with status code 200", async () => {
      const response = await controller.getEntities();

      expect(response).to.be.an.instanceof(results.JsonResult);
      expect(response.statusCode).to.equal(200);
    });
  });
});
