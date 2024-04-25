import { Router } from "express";
import foodRouter from "./food.routes";
import userRouter from "./user.routes";
import orderRouter from "./order.routes";

const indexRouter = Router();

indexRouter.use("/users", userRouter);
indexRouter.use("/foods", foodRouter);
indexRouter.use("/orders", orderRouter);

export default indexRouter;
