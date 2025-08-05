import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../shared/interfaces/product';
import { ProductComponent } from '../../shared/components/business/product/product.component';
import { MainSliderComponent } from '../../shared/components/business/main-slider/main-slider.component';
import { CategoriesService } from '../../core/services/categories.service';
import { Category } from '../../shared/interfaces/category';
import { SwiperContainer } from 'swiper/element';
import { SwiperOptions } from 'swiper/types';
import { BrandSliderComponent } from '../../shared/components/brand-slider/brand-slider.component';
import { RouterLink } from '@angular/router';
import { WishlistService } from '../../core/services/wishlist.service';
import { AuthServiceService } from '../../core/services/auth-service.service';

@Component({
  selector: 'app-home',
  imports: [
    ProductComponent,
    MainSliderComponent,
    BrandSliderComponent,
    RouterLink,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent implements OnInit {
  isLoggedIn = false;
  categories: Category[] | null = null;
  productList: Product[] = [];
  swiperConfig: SwiperOptions = {
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      480: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      1024: {
        slidesPerView: 5,
      },
    },
    spaceBetween: 10,

    speed: 250,

    threshold: 5,
  };
  @ViewChild('swiperRef') swiperRef!: ElementRef<SwiperContainer>;

  productService = inject(ProductService);
  categoryService = inject(CategoriesService);
  wishlistService = inject(WishlistService);
  auth = inject(AuthServiceService);

  ngOnInit(): void {
    this.getCategories();
    this.getProducts();
    this.subscribeInWishList();
  }

  ngAfterViewInit() {
    Object.assign(this.swiperRef.nativeElement, this.swiperConfig);
    this.swiperRef.nativeElement.initialize();
  }

  getProducts() {
    this.productService
      .getAllProducts({ sort: '-price', limit: 60 })
      .subscribe({
        next: (response) => {
          this.productList = response.data.filter(
            (product: Product) =>
              product.priceAfterDiscount != null &&
              product.priceAfterDiscount > 0
          );
        },
      });
  }

  getCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res.data;
      },
    });
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

  swipePrev() {
    this.swiperRef.nativeElement.swiper.slidePrev();
  }

  swipeNext() {
    this.swiperRef.nativeElement.swiper.slideNext();
  }
}
