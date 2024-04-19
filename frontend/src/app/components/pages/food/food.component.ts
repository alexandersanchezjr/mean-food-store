import { CurrencyPipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CartService } from '@services/cart.service';
import { FoodService } from '@services/food.service';
import { Cart } from '@shared/models/Cart';
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

  constructor(
    activatedRoute: ActivatedRoute,
    foodService: FoodService,
    private cartService: CartService,
    private router: Router
  ) {
    activatedRoute.params.subscribe(
      (params) => {
        if(params['id']) this.food = foodService.getById(params['id']);
      }
    )
  }

  addToCart(): void {
    this.cartService.addToCart(this.food);
    this.router.navigateByUrl('/cart');
  }

}
