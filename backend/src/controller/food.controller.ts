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

const getAllFoods = asyncHandler(async (req: Request, res: Response) => {
  const foods = await FoodModel.find();
  res.send(foods);
});

const getFoodByName = asyncHandler(async (req: Request, res: Response) => {
  const nameRegex = new RegExp(req.params.name, "i");
  const foods = await FoodModel.find({ name: { $regex: nameRegex } });
  res.send(foods);
});

const getFoodById = asyncHandler(async (req: Request, res: Response) => {
  const food = await FoodModel.findById(req.params.foodId);
  res.send(food);
});

const getAllTags = asyncHandler(async (req: Request, res: Response) => {
  const tags = await FoodModel.aggregate([
    {
      $unwind: "$tags",
    },
    {
      $group: {
        _id: "$tags",
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        name: "$_id",
        count: "$count",
      },
    },
  ]).sort({ count: -1 });

  const all = {
    name: "All",
    count: await FoodModel.countDocuments(),
  };
  tags.unshift(all);
  res.send(tags);
});

const getAllFoodsByTag = asyncHandler(async (req: Request, res: Response) => {
  const foods = await FoodModel.find({ tags: req.params.tagName });
  res.send(foods);
});

export {
  seedFoods,
  getAllFoods,
  getFoodByName,
  getFoodById,
  getAllTags,
  getAllFoodsByTag,
};
