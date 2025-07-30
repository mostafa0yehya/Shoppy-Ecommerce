import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckOutService {
  constructor(private httpClient: HttpClient) {}
  Checkout(shipping: any, cartId: String): Observable<any> {
    return this.httpClient.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${window.location.origin}`,
      shipping
    );
  }
  CashOrder(form: any, cartId: String): Observable<any> {
    return this.httpClient.post(
      `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
      form
    );
  }
  getUserOrders(userId: string): Observable<any> {
    return this.httpClient.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
    );
  }
}
