import { Component, inject, Input, OnInit } from '@angular/core';
import { WishlistService } from '../../../../core/services/wishlist.service';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-wishlis-button',
  imports: [],
  templateUrl: './wishlis-button.component.html',
  styleUrl: './wishlis-button.component.css',
})
export class WishlisButtonComponent implements OnInit {
  toast = inject(ToastService);
  ngOnInit(): void {
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
    this.showSpinner = true;

    this.whisListService.addToWishList(id).subscribe({
      next: (res) => {
        this.showSpinner = false;

        this.whisListService.whishListArray.next(res.data);
        this.toast.showSucess(res.message);
      },
    });
  }
  IsInWhishList(id: string) {
    return this.whishListArray?.includes(id);
  }
}
