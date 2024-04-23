import { Router } from "express";
import * as controller from "../controller/order.controller";
import authMiddleware from "../middleware/auth.middleware";

const orderRouter = Router();
orderRouter.use(authMiddleware);

orderRouter.post("/create", controller.createOrder);
orderRouter.get("/newOrderForCurrentUser", controller.getNewOrderForCurrentUser);
orderRouter.post("/pay", controller.payOrder);
orderRouter.get("/track", controller.trackOrder);  

export default orderRouter;