import { Component, inject, Input, OnInit } from '@angular/core';
import { CartService } from '../../../../core/services/cart.service';
import { ToastService } from '../../../../core/services/toast.service';
import { DialogModule } from 'primeng/dialog';
import { AuthServiceService } from '../../../../core/services/auth-service.service';
import { Button } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-button',
  imports: [DialogModule, Button, RouterLink],
  templateUrl: './cart-button.component.html',
  styleUrl: './cart-button.component.css',
})
export class CartButtonComponent implements OnInit {
  ngOnInit(): void {
    this.auth.isLoggedIn.subscribe({
      next: (value) => {
        this.isLoggedIn = value;
      },
    });
  }
  auth = inject(AuthServiceService);
  isLoggedIn = false;

  showDialog() {
    this.visible = true;
  }
  visible = false;
  showSpin = false;
  @Input({ required: true }) itemID!: string;
  toast = inject(ToastService);

  cartService = inject(CartService);
  addToCart() {
    if (this.isLoggedIn) {
      this.showSpin = true;
      this.cartService.addToCart(this.itemID).subscribe({
        next: (res) => {
          this.cartService.numberOfCartItemsSubject.next(res.numOfCartItems);
          this.showSpin = false;
          this.toast.showSucess(res.message);
        },

        error: (err) => {
          this.showSpin = false;
        },
      });
    } else {
      this.visible = true;
    }
  }
}
