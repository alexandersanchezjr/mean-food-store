import { Request, Response } from "express";
import { sample_users } from "../data";
import jwt from "jsonwebtoken";
import { UserModel } from "../model/User.model";
import asyncHandler from "express-async-handler";
import { HTTP_BAD_REQUEST } from "../constants/http_status";
import bcrypt from "bcryptjs";

const seedUsers = asyncHandler(async (req: Request, res: Response) => {
  const usersCount = await UserModel.countDocuments();
  if (usersCount > 0) {
    res.send("Users already exist");
    return;
  }

  await UserModel.create(sample_users);
  res.send("Users created");
});

const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password, address } = req.body;
  const user = await UserModel.findOne({ email });
  if (user) {
    res.status(HTTP_BAD_REQUEST).send("User already exists");
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await UserModel.create({
    id: "",
    name,
    email: email.toLowerCase(),
    password: hashedPassword,
    address,
    isAdmin: false,
  })

  const dbUser = await UserModel.create(newUser);

  res.send(generateTokenResponse(dbUser));
});

const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email, password });

  if (user) {
    res.send(generateTokenResponse(user));
  } else {
    res.status(HTTP_BAD_REQUEST).send("User not found");
  }
});

const generateTokenResponse = (user: any) => {
  const token = jwt.sign(
    { id: user.id, email: user.email, password: user.password },
    "secret",
    {
      expiresIn: "30d",
    }
  );

  return {
    id: user.id,
    token: token,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    address: user.address,
  };
};

export { seedUsers, register, login };
