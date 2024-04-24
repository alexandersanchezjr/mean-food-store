import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '@services/order.service';
import { Order } from '@shared/models/Order';
import { TitleComponent } from "../../partials/title/title.component";
import { OrderListComponent } from "../../partials/order-list/order-list.component";
import { MapComponent } from "../../partials/map/map.component";
import { PayButtonComponent } from "@components/partials/pay-button/pay-button.component";

@Component({
    selector: 'app-payment',
    standalone: true,
    templateUrl: './payment.component.html',
    styleUrl: './payment.component.css',
    imports: [TitleComponent, OrderListComponent, MapComponent, PayButtonComponent]
})
export class PaymentComponent {

  order: Order = new Order();

  constructor(private orderService: OrderService, router: Router) {
    this.orderService.getNewOrderForCurrentUser().subscribe({
      next: (order) => {
        this.order = order;
      }, error: (error) => {
        console.error(error);
        router.navigateByUrl('/checkout');
      }
    })
  }

}
