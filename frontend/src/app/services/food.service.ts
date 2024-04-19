import { Injectable } from '@angular/core';
import { Food } from '@shared/models/Food';
import { Tag } from '@shared/models/Tag';
import { sample_foods, sample_tags } from 'data';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor() {}

  getAll(): Food[] {
    return sample_foods;
  }

  getById(id: string): Food {
    return this.getAll().find((food) => food.id == id) ?? new Food();
  }

  searchByName(name: string) {
    return this.getAll().filter((food) =>
      food.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  getAllTags(): Tag[] {
    return sample_tags;
  }

  getAllFoodsByTag(tag: string): Food[] {
    return tag === 'All'
      ? this.getAll()
      : this.getAll().filter((food) => food.tags?.includes(tag));
  }
}
