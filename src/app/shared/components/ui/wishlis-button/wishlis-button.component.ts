import { Component, inject, Input, OnInit } from '@angular/core';
import { WishlistService } from '../../../../core/services/wishlist.service';
import { ToastService } from '../../../../core/services/toast.service';
import { AuthServiceService } from '../../../../core/services/auth-service.service';
import { RouterLink } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-wishlis-button',
  imports: [RouterLink, DialogModule, Button],
  templateUrl: './wishlis-button.component.html',
  styleUrl: './wishlis-button.component.css',
})
export class WishlisButtonComponent implements OnInit {
  toast = inject(ToastService);

  auth = inject(AuthServiceService);
  isLoggedIn = false;

  showDialog() {
    this.visible = true;
  }
  visible = false;
  ngOnInit(): void {
    this.auth.isLoggedIn.subscribe({
      next: (value) => {
        this.isLoggedIn = value;
      },
    });
    this.whisListService.whishListArray.subscribe({
      next: (data) => {
        this.whishListArray = data;
      },
    });
  }
  whishListArray: string[] | null = null;
  showSpinner = false;
  @Input({ required: true }) productId!: string;
  whisListService = inject(WishlistService);
  addToWhisList(id: string) {
    if (this.isLoggedIn) {
      this.showSpinner = true;

      this.whisListService.addToWishList(id).subscribe({
        next: (res) => {
          this.showSpinner = false;

          this.whisListService.whishListArray.next(res.data);
          this.toast.showSucess(res.message);
        },
      });
    } else {
      this.visible = true;
      this.showSpinner = false;
    }
  }
  IsInWhishList(id: string) {
    return this.whishListArray?.includes(id);
  }
}
