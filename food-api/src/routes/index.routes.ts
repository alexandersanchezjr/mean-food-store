import { Router } from "express";
import foodRouter from "./food.routes";
import userRouter from "./user.routes";

const indexRouter = Router();

indexRouter.use("/users", userRouter);
indexRouter.use("/foods", foodRouter);

export default indexRouter;
