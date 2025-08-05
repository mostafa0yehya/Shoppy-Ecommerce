import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { Brand } from '../../shared/interfaces/orders';
import { RouterLink } from '@angular/router';
import { WishlistService } from '../../core/services/wishlist.service';
import { AuthServiceService } from '../../core/services/auth-service.service';

@Component({
  selector: 'app-brands',
  imports: [RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent implements OnInit {
  brandsService = inject(BrandsService);
  brandsList: null | Brand[] = null;
  wishlistService = inject(WishlistService);
  auth = inject(AuthServiceService);
  isLoggedIn = false;

  ngOnInit(): void {
    this.brandsService.getAllBrands().subscribe({
      next: (res) => {
        this.brandsList = res.data;
      },
    });

    this.subscribeInWishList();
  }

  subscribeInWishList() {
    this.auth.isLoggedIn.subscribe({
      next: (value) => {
        this.isLoggedIn = value;
        if (this.isLoggedIn) {
          //whislist array subject to mark whislisted  products of user with diffrent color

          this.wishlistService.subscribeOnWishListArray();
        }
      },
    });
  }
}
