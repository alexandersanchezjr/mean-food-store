import { CurrencyPipe, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Order } from '@shared/models/Order';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [ RouterModule, NgFor, CurrencyPipe ],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent {

  @Input()
  order!: Order;
}
