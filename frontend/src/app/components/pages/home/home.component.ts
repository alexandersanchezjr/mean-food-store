import { CurrencyPipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FoodService } from '@services/food.service';
import { Food } from '@shared/models/Food';
import { StarRatingModule } from 'angular-star-rating';
import { SearchComponent } from "../../partials/search/search.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [
        RouterModule,
        NgFor,
        StarRatingModule,
        CurrencyPipe,
        SearchComponent
    ]
})
export class HomeComponent {

  foods: Food[] = [];

  constructor(private foodService: FoodService, activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe(
      (params) => {
        const name: string = params['name']
        if(params['name'])
          this.foods = this.foodService.searchByName(name);
        else
          this.foods = foodService.getAll();
      }
    )
  }


}
