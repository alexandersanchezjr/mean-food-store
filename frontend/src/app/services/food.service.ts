import { Injectable } from '@angular/core';
import { Food } from '@shared/models/Food';
import { sample_foods } from 'data';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() { }

  getAll(): Food[] {
    return sample_foods;
  }

  searchByName(name: string) {
    return this.getAll().filter(
      food => food.name.toLowerCase().includes(name.toLowerCase())
    )
  }
}
