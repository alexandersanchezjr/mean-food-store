import { Request, Response } from "express";
import { sample_foods, sample_tags } from "../data";
import asyncHandler from "express-async-handler";
import { FoodModel } from "../model/Food.model";

const seedFoods = asyncHandler(async (req: Request, res: Response) => {
  const foodsCounts = await FoodModel.countDocuments();
  if (foodsCounts > 0) {
    res.send("Foods already exist");
    return;
  }

  await FoodModel.create(sample_foods);
  res.send("Foods created");
});

const getAllFoods = async (req: Request, res: Response) => {
  res.send(sample_foods);
};

const getFoodByName = async (req: Request, res: Response) => {
  const foods = sample_foods.filter((food) =>
    food.name.toLowerCase().includes(req.params.name.toLowerCase())
  );
  res.send(foods);
};

const getFoodById = async (req: Request, res: Response) => {
  const food = sample_foods.find((food) => food.id === req.params.foodId);
  res.send(food);
};

const getAllTags = async (req: Request, res: Response) => {
  res.send(sample_tags);
};

const getAllFoodsByTag = async (req: Request, res: Response) => {
  const foods = sample_foods.filter((food) =>
    food.tags?.includes(req.params.tagName)
  );
  res.send(foods);
};

export {
  seedFoods,
  getAllFoods,
  getFoodByName,
  getFoodById,
  getAllTags,
  getAllFoodsByTag,
};
