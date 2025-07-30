import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Item } from '../../shared/interfaces/whish-list-bag';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  constructor(private httpClient: HttpClient) {
    this.getUserwishlist().subscribe({
      next: (res) => {
        this.whishListArray.next((res.data as Item[]).map((item) => item.id));
      },
    });
  }
  whishListArray = new BehaviorSubject<string[]>([]);
  addToWishList(prodId: string): Observable<any> {
    return this.httpClient.post(
      'https://ecommerce.routemisr.com/api/v1/wishlist',
      { productId: prodId }
    );
  }
  getUserwishlist(): Observable<any> {
    return this.httpClient.get(
      'https://ecommerce.routemisr.com/api/v1/wishlist'
    );
  }
  removeWhisListItem(id: string): Observable<any> {
    return this.httpClient.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`
    );
  }
}
