import { Component, inject, OnInit, Renderer2 } from '@angular/core';

import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { Cart } from '../../shared/interfaces/cart';
import { NgxSpinnerService } from 'ngx-spinner';
import { SelectModule } from 'primeng/select';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, SelectModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartService = inject(CartService);
  toast = inject(ToastService);

  ngxSpinner = inject(NgxSpinnerService);
  cart: Cart | null = null;
  deliveryDate: string = '';
  isLoading: boolean = true;
  render = inject(Renderer2);

  getCart() {
    this.ngxSpinner.show();

    this.cartService.cartDetails().subscribe({
      next: (res) => {
        this.cart = res;
        this.ngxSpinner.hide();
        this.isLoading = true;
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
  removeItem(id: string, anchor: HTMLElement) {
    this.showSpin(anchor);
    this.cartService.removeCartItem(id).subscribe({
      next: (res) => {
        this.cart = res;
        this.cartService.numberOfCartItemsSubject.next(res.numOfCartItems);
        this.hideSpin(anchor);
        this.toast.showSucess('cart updated successfully');
      },
      error: (res) => {
        this.hideSpin(anchor);
      },
    });
  }
  updateProductQuantity(productId: string, count: number, anchor: HTMLElement) {
    this.showSpin(anchor);

    this.cartService.updateCartProductQuantity(productId, count).subscribe({
      next: (res) => {
        this.cart = res;
        this.cartService.numberOfCartItemsSubject.next(res.numOfCartItems);
        this.hideSpin(anchor);
        this.toast.showSucess('cart updated successfully');
      },
      error: (res) => {
        this.hideSpin(anchor);
      },
    });
  }

  showSpin(anchor: HTMLElement) {
    this.render.removeClass(anchor.querySelector('.spiner-icon'), 'hidden');
    this.render.addClass(anchor.querySelector('.main-icon'), 'hidden');
    this.render.setAttribute(anchor, 'disabled', 'true');
  }
  hideSpin(anchor: HTMLElement) {
    this.render.addClass(anchor.querySelector('.spiner-icon'), 'hidden');
    this.render.removeClass(anchor.querySelector('.main-icon'), 'hidden');
    this.render.removeAttribute(anchor, 'disabled');
  }
}
