import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '@services/cart.service';
import { UserService } from '@services/user.service';
import { Order } from '@shared/models/Order';
import { ToastrService } from 'ngx-toastr';
import { TextInputComponent } from "../../partials/text-input/text-input.component";
import { TitleComponent } from "../../partials/title/title.component";
import { OrderListComponent } from "../../partials/order-list/order-list.component";
import { MapComponent } from "../../partials/map/map.component";
import { OrderService } from '@services/order.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-checkout',
    standalone: true,
    templateUrl: './checkout.component.html',
    styleUrl: './checkout.component.css',
    imports: [ReactiveFormsModule, TextInputComponent, TitleComponent, OrderListComponent, MapComponent]
})
export class CheckoutComponent {
  order: Order = new Order();
  checkoutForm!: FormGroup;

  constructor(
    cartService: CartService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastrService: ToastrService,
    private orderService: OrderService,
    private router: Router
  ) {
    const cart = cartService.getCart();
    this.order.items = cart.items;
    this.order.totalPrice = cart.totalPrice;
  }

  ngOnInit(): void {
    let { name, address } = this.userService.currentUser;

    this.checkoutForm = this.formBuilder.group({
      name: [name, Validators.required],
      address: [address, Validators.required],
    })
  }

  get formControls() {
    return this.checkoutForm.controls;
  }

  createOrder() {
    if (this.checkoutForm.invalid) {
      this.toastrService.warning('Please provide your name and address', 'Warning');
      return;
    }

    if (!this.order.addressLatLng) {
      this.toastrService.warning('Please select your address on the map', 'Warning');
      return;
    }

    this.order.name = this.formControls['name'].value;
    this.order.address = this.formControls['address'].value;

    this.orderService.createOrder(this.order).subscribe({
      next: () => {
        this.toastrService.success('Order created successfully', 'Success');
        this.router.navigate(['/payment'])
      },
      error: (errorResponse) => {
        this.toastrService.error('Failed to create order: ' + errorResponse.error, 'Error');
      }
    });
  }
}
