import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CartService } from '@services/cart.service';
import { FoodService } from '@services/food.service';
import { Cart } from '@shared/models/Cart';
import { Food } from '@shared/models/Food';
import { StarRatingModule } from 'angular-star-rating';
import { NotFoundComponent } from "../../partials/not-found/not-found.component";

@Component({
    selector: 'app-food',
    standalone: true,
    templateUrl: './food.component.html',
    styleUrl: './food.component.css',
    imports: [
        StarRatingModule,
        NgFor,
        NgIf,
        RouterModule,
        CurrencyPipe,
        NotFoundComponent
    ]
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
        if(params['id']) {
          foodService.getById(params['id']).subscribe(
            (food) => this.food = food
          )
        }
      }
    )
  }

  addToCart(): void {
    this.cartService.addToCart(this.food);
    this.router.navigateByUrl('/cart');
  }

}
