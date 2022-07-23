import { Router } from "express";
import testController from "../controllers/testController.js";
import { ensureAuthenticatedMiddleware } from "../middlewares/ensureAuthenticatedMiddleware.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import testSchema from "../schemas/testSchema.js";

const testRouter = Router();

testRouter.post(
  "/tests",
  ensureAuthenticatedMiddleware,
  validateSchemaMiddleware(testSchema),
  testController.insert
);

testRouter.get("/tests", ensureAuthenticatedMiddleware, testController.find);

export default testRouter;
