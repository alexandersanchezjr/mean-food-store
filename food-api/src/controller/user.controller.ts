import { Request, Response } from "express";
import { sample_users } from "../data";
import jwt from "jsonwebtoken";
import { UserModel } from "../model/User.model";
import asyncHandler from "express-async-handler";

const seedUsers = asyncHandler(async (req: Request, res: Response) => {
  const usersCount = await UserModel.countDocuments();
  if (usersCount > 0) {
    res.send("Users already exist");
    return;
  }

  await UserModel.create(sample_users);
  res.send("Users created");
})

const register = async (req: Request, res: Response) => {
  res.send("register");
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = sample_users.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    res.send(generateTokenResponse(user));
  } else {
    res.status(400).send("User not found");
  }
};

const generateTokenResponse = (user: any) => {
  const token = jwt.sign({ email: user.email, password: user.password }, "secret", {
    expiresIn: "30d",
  });

  user.token = token;
  return user;
};

export { seedUsers, register, login };
