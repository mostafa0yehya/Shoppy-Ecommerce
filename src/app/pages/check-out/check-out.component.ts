import { Component, inject, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { CartService } from '../../core/services/cart.service';
import { Cart } from '../../shared/interfaces/cart';
import { CheckOutService } from '../../core/services/check-out.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  imports: [ReactiveFormsModule, FloatLabel, InputTextModule],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.css',
})
export class CheckOutComponent implements OnInit {
  ngOnInit(): void {
    this.getCart();
  }
  //cartId
  @Input() id!: string;
  @Input() type!: string;
  cartService = inject(CartService);
  checkOutService = inject(CheckOutService);
  ngxSpinner = inject(NgxSpinnerService);
  router = inject(Router);
  showSpinner = false;
  cart: Cart | null = null;
  deliveryDate: string = '';
  shippingForm = new FormGroup({
    details: new FormControl('', Validators.required),
    phone: new FormControl('', [
      Validators.pattern('^01[0125][0-9]{8}$'),
      Validators.required,
    ]),
    city: new FormControl('', Validators.required),
  });
  checkOut() {
    this.showSpinner = true;

    if (this.type === 'visa') {
      this.checkOutService
        .Checkout(this.shippingForm.value, this.id)
        .subscribe({
          next: (res) => {
            window.location.href = res.session.url;
            this.showSpinner = false;
          },
        });
    } else if (this.type === 'cash') {
      this.checkOutService
        .CashOrder(this.shippingForm.value, this.id)
        .subscribe({
          next: () => {
            this.router.navigate(['/allorders']);
          },
          error: () => {
            this.router.navigate(['/cart']);
          },
        });
    }
  }
  getDeliveryDate() {
    const today = new Date();
    today.setDate(today.getDate() + 2);
    return today.toISOString().split('T')[0];
  }
  getCart() {
    this.ngxSpinner.show();
    this.cartService.cartDetails().subscribe({
      next: (res) => {
        this.cart = res;
        this.ngxSpinner.hide();
      },
      error: (res) => {
        this.ngxSpinner.hide();
      },
    });
  }
}
