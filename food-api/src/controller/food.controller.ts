import { Request, Response } from "express";
import { sample_foods, sample_tags } from "../data";

const getAllFoods = async (req: Request, res: Response) => {
    console.log(sample_foods);
    res.send(sample_foods);
}

const getFoodByName = async (req: Request, res: Response) => {
    const foods = sample_foods.filter((food) =>
        food.name.toLowerCase().includes(req.params.name.toLowerCase())
      );
      res.send(foods);
}

const getFoodById = async (req: Request, res: Response) => {
    const food = sample_foods.find((food) => food.id === req.params.foodId);
    res.send(food);
}

const getAllTags = async (req: Request, res: Response) => {
    console.log(sample_tags);
    res.send(sample_tags);
}

const getAllFoodsByTag = async (req: Request, res: Response) => {
    const foods = sample_foods.filter((food) =>
        food.tags?.includes(req.params.tagName)
      );
      res.send(foods);
}

export {
    getAllFoods,
    getFoodByName,
    getFoodById,
    getAllTags,
    getAllFoodsByTag
}