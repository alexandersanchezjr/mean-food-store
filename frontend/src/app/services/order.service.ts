import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '@shared/models/Order';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${SERVER_URL}${ORDER_CREATE_PATH}`, order);
  }

  getNewOrderForCurrentUser(): Observable<Order> {
    return this.http.get<Order>(`${SERVER_URL}${ORDER_NEW_FOR_CURRENT_USER_PATH}`);
  }

}

const SERVER_URL = environment.serverUrl;
const ORDER_CREATE_PATH = environment.createOrderPath;
const ORDER_NEW_FOR_CURRENT_USER_PATH = environment.newOrderForCurrentUserPath;
