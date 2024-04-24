import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '@services/cart.service';
import { OrderService } from '@services/order.service';
import { Order } from '@shared/models/Order';
import { ToastrService } from 'ngx-toastr';
import { StripeService } from 'ngx-stripe';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-pay-button',
  standalone: true,
  imports: [],
  templateUrl: './pay-button.component.html',
  styleUrl: './pay-button.component.css',
})
export class PayButtonComponent {
  @Input()
  order!: Order;

  constructor(
    private orderService: OrderService,
    private cartService: CartService,
    private router: Router,
    private toastrService: ToastrService,
    private stripeService: StripeService
  ) {}

  pay() {
    this.orderService.pay(this.order).pipe(
      switchMap((session) => {
        return this.stripeService.redirectToCheckout({ sessionId: session.id });
      })
    ).subscribe({
      error: (error) => {
        this.toastrService.error(error.statusText);
      }
    });
  }
}
