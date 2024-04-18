import { CurrencyPipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FoodService } from '@services/food.service';
import { Food } from '@shared/models/Food';
import { StarRatingModule } from 'angular-star-rating';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule,
    NgFor,
    StarRatingModule,
    CurrencyPipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  foods: Food[];

  constructor(private foodService: FoodService) {
    this.foods = foodService.getAll();
  }


}
