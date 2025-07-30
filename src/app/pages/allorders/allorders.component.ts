import { Component, inject, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { AuthServiceService } from '../../core/services/auth-service.service';
import { User } from '../../shared/interfaces/user';
import { CheckOutService } from '../../core/services/check-out.service';
import { orders } from '../../shared/interfaces/orders';
import { RouterLink } from '@angular/router';
import { AccordionModule } from 'primeng/accordion';
import { DatePipe } from '@angular/common';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-allorders',
  imports: [RouterLink, AccordionModule, DatePipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.css',
})
export class AllordersComponent implements OnInit {
  authService = inject(AuthServiceService);
  checkOutService = inject(CheckOutService);
  cartService = inject(CartService);
  user: User | null = null;
  userOrders: orders | null = null;
  ngOnInit(): void {
    this.user = this.authService.getUserData();
    this.getUserOrders();
    this.cartService.updateNumberOfCartItems;
  }
  getUserOrders() {
    if (this.user) {
      this.checkOutService.getUserOrders(this.user?.id).subscribe({
        next: (res) => {
          this.userOrders = res;
          console.log(this.userOrders);
          this.cartService.updateNumberOfCartItems();
        },
      });
    }
  }

  getNumberOfPaidOrders() {
    const isPaid = this.userOrders?.filter((i) => {
      return i.isPaid;
    });
    return isPaid?.length;
  }
  getNumberOfDeliveredOrders() {
    const isDelivered = this.userOrders?.filter((i) => {
      return i.isDelivered;
    });
    return isDelivered?.length;
  }
}
