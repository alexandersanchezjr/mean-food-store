import { Router } from "express";
import * as controller from "../controller/food.controller";

const foodRouter = Router();

foodRouter.get("/", controller.getAllFoods);
foodRouter.get("/search/:name", controller.getFoodByName);
foodRouter.get("/tags", controller.getAllTags);
foodRouter.get("/:foodId", controller.getFoodById);
foodRouter.get("/tag/:tagName", controller.getAllFoodsByTag);

export default foodRouter;
