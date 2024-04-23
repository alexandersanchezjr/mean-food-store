import { Routes } from '@angular/router';
import { CartComponent } from '@components/pages/cart/cart.component';
import { CheckoutComponent } from '@components/pages/checkout/checkout.component';
import { FoodComponent } from '@components/pages/food/food.component';
import { HomeComponent } from '@components/pages/home/home.component';
import { LoginComponent } from '@components/pages/login/login.component';
import { PaymentComponent } from '@components/pages/payment/payment.component';
import { RegisterComponent } from '@components/pages/register/register.component';
import { authGuard } from '@shared/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [authGuard] },
  { path: 'search/:name', component: HomeComponent, canActivate: [authGuard]  },
  { path: 'tag/:tag', component: HomeComponent, canActivate: [authGuard]  },
  { path: 'food/:id', component: FoodComponent, canActivate: [authGuard]  },
  { path: 'cart', component: CartComponent, canActivate: [authGuard]  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'checkout', component: CheckoutComponent, canActivate: [authGuard] },
  { path: 'payment', component: PaymentComponent, canActivate: [authGuard] }
];

