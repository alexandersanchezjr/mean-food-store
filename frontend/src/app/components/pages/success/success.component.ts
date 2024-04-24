import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './success.component.html',
  styleUrl: './success.component.css',
})
export class SuccessComponent {

  private orderId: string = '';

  constructor(activatedRoute: ActivatedRoute) {
    activatedRoute.queryParams.subscribe((params) => {
      console.log(params);

      if (params['orderId']) {
        this.orderId = params['orderId'];
        console.log('Payment was successful' + params['orderId']);
      } else {
        console.log('Payment was not successful');
      }
    });
  }

  get successOrderId(): string {
    return this.orderId;
  }
}
