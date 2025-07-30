import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  numberOfCartItemsSubject = new BehaviorSubject<number>(0);
  constructor(private httpClient: HttpClient) {}
  addToCart(id: string): Observable<any> {
    return this.httpClient.post(
      'https://ecommerce.routemisr.com/api/v1/cart',
      { productId: id }
      // { headers: { token: this.userToken } }
    );
  }

  cartDetails(): Observable<any> {
    return this.httpClient.get(
      'https://ecommerce.routemisr.com/api/v1/cart',
      {}
    );
  }
  clearCart(): Observable<any> {
    return this.httpClient.delete(
      'https://ecommerce.routemisr.com/api/v1/cart'
      // { headers: { token: this.userToken } }
    );
  }
  removeCartItem(id: string): Observable<any> {
    return this.httpClient.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`
      // { headers: { token: this.userToken } }
    );
  }
  updateCartProductQuantity(
    productId: string,
    quantity: number
  ): Observable<any> {
    return this.httpClient.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      { count: quantity }
      // { headers: { token: this.userToken } }
    );
  }

  updateNumberOfCartItems() {
    this.cartDetails().subscribe({
      next: (res) => {
        this.numberOfCartItemsSubject.next(res.numOfCartItems);
      },
    });
  }
}
