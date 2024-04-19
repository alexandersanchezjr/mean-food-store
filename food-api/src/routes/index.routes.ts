import { Router } from "express";
import foodRouter from "./food.routes";

const indexRouter = Router();

indexRouter.use("/users", userRouter);
indexRouter.use("/foods", foodRouter);

export default indexRouter;
