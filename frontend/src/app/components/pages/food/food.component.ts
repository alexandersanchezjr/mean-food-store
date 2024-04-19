import { CurrencyPipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FoodService } from '@services/food.service';
import { Food } from '@shared/models/Food';
import { StarRatingModule } from 'angular-star-rating';

@Component({
  selector: 'app-food',
  standalone: true,
  imports: [
    StarRatingModule,
    NgFor,
    RouterModule,
    CurrencyPipe
  ],
  templateUrl: './food.component.html',
  styleUrl: './food.component.css'
})
export class FoodComponent {

  food!: Food;

  constructor(activatedRoute: ActivatedRoute, foodService: FoodService) {
    activatedRoute.params.subscribe(
      (params) => {
        if(params['id']) this.food = foodService.getById(params['id']);
      }
    )
  }

}
