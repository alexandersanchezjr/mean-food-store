import { Component } from '@angular/core';
import { CartService } from '@services/cart.service';
import { Cart } from '@shared/models/Cart';
import { TitleComponent } from "../../partials/title/title.component";
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-cart',
    standalone: true,
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.css',
    imports: [TitleComponent, NgFor, RouterModule, CurrencyPipe, NgIf]
})
export class CartComponent {

  cart!: Cart;

  constructor(private cartService: CartService) {
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart
    })
  }

  removeFromCart(foodId: string): void {
    this.cartService.removeFromCart(foodId);
  }

  changeQuantity(foodId: string, stringQuantity: string) {
    const quantity = parseInt(stringQuantity);
    this.cartService.changeQuantity(foodId, quantity);
  }

}
