import { Component, inject, OnInit } from '@angular/core';

import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { Cart } from '../../shared/interfaces/cart';
import { NgxSpinnerService } from 'ngx-spinner';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, SelectModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartService = inject(CartService);
  ngxSpinner = inject(NgxSpinnerService);
  cart: Cart | null = null;
  deliveryDate: string = '';
  isLoading: boolean = true;
  getCart() {
    this.ngxSpinner.show();

    this.cartService.cartDetails().subscribe({
      next: (res) => {
        this.cart = res;
        this.ngxSpinner.hide();
        this.isLoading = true;
        console.log(res);
      },
      error: (res) => {
        this.ngxSpinner.hide();
        this.isLoading = true;
      },
    });
  }
  ngOnInit(): void {
    this.getCart();
  }
  getDeliveryDate() {
    const today = new Date();
    today.setDate(today.getDate() + 2);
    return today.toISOString().split('T')[0];
  }

  clearCart() {
    this.ngxSpinner.show();

    this.cartService.clearCart().subscribe({
      next: (res) => {
        this.getCart();
        this.ngxSpinner.hide();
        this.cartService.numberOfCartItemsSubject.next(0);
      },
      error: (res) => {
        this.ngxSpinner.hide();
      },
    });
  }
  removeItem(id: string) {
    this.cartService.removeCartItem(id).subscribe({
      next: (res) => {
        this.cart = res;
        this.cartService.numberOfCartItemsSubject.next(res.numOfCartItems);
      },
      // error: (res) => {
      //   console.log(res);
      // },
    });
  }
  updateProductQuantity(productId: string, count: number) {
    this.cartService.updateCartProductQuantity(productId, count).subscribe({
      next: (res) => {
        this.cart = res;
        this.cartService.numberOfCartItemsSubject.next(res.numOfCartItems);
      },
      // error: (res) => {
      //   console.log(res);
      // },
    });
  }
}
