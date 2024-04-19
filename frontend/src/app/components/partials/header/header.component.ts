import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '@services/cart.service';
import { UserService } from '@services/user.service';
import { User } from '@shared/models/User';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  cartQuantity: number = 0;
  user!: User;

  constructor(
    private router: Router,
    private cartService: CartService,
    private userService: UserService
  ) {
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cartQuantity = cart.totalCount;
    });

    userService.userObservable.subscribe((user) => {
      this.user = user;
    })
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

  get isAuthenticated(): boolean {
    return !!this.user.token;
  }
}
