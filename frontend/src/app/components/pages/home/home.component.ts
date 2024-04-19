import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FoodService } from '@services/food.service';
import { Food } from '@shared/models/Food';
import { StarRatingModule } from 'angular-star-rating';
import { SearchComponent } from "../../partials/search/search.component";
import { TagComponent } from '@components/partials/tag/tag.component';
import { NotFoundComponent } from "../../partials/not-found/not-found.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [
        RouterModule,
        NgFor,
        NgIf,
        StarRatingModule,
        CurrencyPipe,
        SearchComponent,
        TagComponent,
        NotFoundComponent
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
        else if(params['tag'])
          this.foods = this.foodService.getAllFoodsByTag(params['tag']);
        else
          this.foods = foodService.getAll();
      }
    )
  }


}
