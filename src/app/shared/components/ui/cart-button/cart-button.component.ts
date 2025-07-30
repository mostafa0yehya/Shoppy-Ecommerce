import { Component, inject, Input } from '@angular/core';
import { CartService } from '../../../../core/services/cart.service';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-cart-button',
  imports: [],
  templateUrl: './cart-button.component.html',
  styleUrl: './cart-button.component.css',
})
export class CartButtonComponent {
  showSpin = false;
  @Input({ required: true }) itemID!: string;
  toast = inject(ToastService);

  cartService = inject(CartService);
  addToCart() {
    this.showSpin = true;
    this.cartService.addToCart(this.itemID).subscribe({
      next: (res) => {
        console.log(res);
        this.cartService.numberOfCartItemsSubject.next(res.numOfCartItems);
        this.showSpin = false;
        this.toast.showSucess(res.message);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
