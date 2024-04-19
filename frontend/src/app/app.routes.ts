import { Routes } from '@angular/router';
import { CartComponent } from '@components/pages/cart/cart.component';
import { FoodComponent } from '@components/pages/food/food.component';
import { HomeComponent } from '@components/pages/home/home.component';
import { LoginComponent } from '@components/pages/login/login.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search/:name', component: HomeComponent },
  { path: 'tag/:tag', component: HomeComponent },
  { path: 'food/:id', component: FoodComponent },
  { path: 'cart', component: CartComponent },
  { path: 'login', component: LoginComponent}
];
