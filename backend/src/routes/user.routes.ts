import { Router } from "express";
import * as controller from "../controller/user.controller";

const userRouter = Router();

userRouter.get("/seed", controller.seedUsers);
userRouter.post("/register", controller.register);
userRouter.post("/login", controller.login);

export default userRouter;