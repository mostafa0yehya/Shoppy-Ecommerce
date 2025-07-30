import { Component, inject, OnInit, Renderer2 } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist.service';
import { WhishListBag } from '../../shared/interfaces/whish-list-bag';
import { RouterLink } from '@angular/router';

import { CartButtonComponent } from '../../shared/components/ui/cart-button/cart-button.component';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-favourites',
  imports: [RouterLink, CartButtonComponent],
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.css',
})
export class FavouritesComponent implements OnInit {
  toast = inject(ToastService);
  render = inject(Renderer2);
  whisListService = inject(WishlistService);
  whishListBag: WhishListBag | null = null;
  showSpin = false;
  ngOnInit(): void {
    this.getUserWhishList();
  }
  getUserWhishList() {
    this.whisListService.getUserwishlist().subscribe({
      next: (res) => {
        this.whishListBag = res;
        console.log(this.whishListBag);
      },
    });
  }
  removeWhishListItem(id: string, event: any) {
    const anchor = event.currentTarget as HTMLElement;
    this.render.removeClass(anchor.querySelector('.spiner-icon'), 'hidden');
    this.render.addClass(anchor.querySelector('.trash-icon'), 'hidden');

    this.whisListService.removeWhisListItem(id).subscribe({
      next: (res) => {
        this.getUserWhishList();
        this.whisListService.whishListArray.next(res.data);
        this.toast.showSucess(res.message);
        this.render.addClass(anchor.querySelector('.spiner-icon'), 'hidden');
        this.render.removeClass(anchor.querySelector('.trash-icon'), 'hidden');
      },
    });
  }
}
