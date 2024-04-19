import { Routes } from '@angular/router';
import { FoodComponent } from '@components/pages/food/food.component';
import { HomeComponent } from '@components/pages/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search/:name', component: HomeComponent },
  { path: 'food/:id', component: FoodComponent}
];
