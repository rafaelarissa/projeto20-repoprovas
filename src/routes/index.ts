import { Router } from "express";
import testRouter from "./testRouter.js";
// import categoryRouter from "./categoryRouter.js";
import userRouter from "./userRouter.js";

const router = Router();
router.use(userRouter);
router.use(testRouter);
// router.use(categoryRouter);
export default router;
