import { Component, inject, Input, OnInit } from '@angular/core';
import { ProductsFilter } from '../../shared/interfaces/products-filter';
import { Brand } from '../../shared/interfaces/whish-list-bag';
import { ProductComponent } from '../../shared/components/business/product/product.component';
import { BrandsService } from '../../core/services/brands.service';
import { Product } from '../../shared/interfaces/product';
import { PaginatorModule } from 'primeng/paginator';
import { ProductService } from '../../core/services/product.service';
import { RouterLink } from '@angular/router';
import { WishlistService } from '../../core/services/wishlist.service';
import { AuthServiceService } from '../../core/services/auth-service.service';

@Component({
  selector: 'app-single-brand',
  imports: [ProductComponent, PaginatorModule, RouterLink],
  templateUrl: './single-brand.component.html',
  styleUrl: './single-brand.component.css',
})
export class SingleBrandComponent implements OnInit {
  @Input('id') id!: string;
  param!: ProductsFilter;
  brandsService = inject(BrandsService);
  productService = inject(ProductService);

  productsList: Product[] | null = null;
  brand: Brand | null = null;

  wishlistService = inject(WishlistService);
  auth = inject(AuthServiceService);
  isLoggedIn = false;
  //pagination parmas
  rows = 0;
  totalRecords = 0;
  first = 0;

  ngOnInit(): void {
    this.param = { brand: this.id, limit: 10 };

    this.getAllProducts();
    this.subscribeInWishList();
  }
  getAllProducts() {
    this.productService.getAllProducts(this.param).subscribe({
      next: (res) => {
        console.log(res);

        this.productsList = res.data;
        if (this.productsList) this.brand = this.productsList[0].brand;
        this.totalRecords = res.results;
        this.rows = res.metadata.limit;
      },
    });
  }
  onPageChange(event: any) {
    this.param.page = event.page + 1;
    this.rows = event.rows;
    this.param.limit = event.rows;
    this.first = event.first;
    this.getAllProducts();
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
