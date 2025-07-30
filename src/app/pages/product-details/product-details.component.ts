import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../shared/interfaces/product';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FeaturesOfProductComponent } from '../../shared/components/ui/features-of-product/features-of-product.component';
import { WishlisButtonComponent } from '../../shared/components/ui/wishlis-button/wishlis-button.component';
import { CartService } from '../../core/services/cart.service';
import { SwiperContainer } from 'swiper/element';
import { SwiperOptions } from 'swiper/types';
import { ToastService } from '../../core/services/toast.service';
import { ProductComponent } from '../../shared/components/business/product/product.component';

@Component({
  selector: 'app-product-details',
  imports: [
    FeaturesOfProductComponent,
    RouterLink,
    WishlisButtonComponent,
    ProductComponent,
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductDetailsComponent {
  @ViewChild('swiperRef') swiperRef!: ElementRef<SwiperContainer>;
  @ViewChild('swiper2') swiper2!: ElementRef<SwiperContainer>;
  @ViewChild('similarRef') similarRef!: ElementRef<SwiperContainer>;
  swiperConfig: SwiperOptions = {
    spaceBetween: 10,
  };

  swiper2Config: SwiperOptions = {
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    direction: 'vertical',
    watchSlidesProgress: true,
  };
  simlarRefConfig: SwiperOptions = {
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

  toast = inject(ToastService);

  showspin = false;
  productId: string | null = null;
  productData: Product | null = null;
  productList: Product[] = [];

  stars: ('full' | 'half' | 'empty')[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    public productService: ProductService
  ) {}

  ngOnInit(): void {
    this.getProduct();
    this.getAllProducts();
  }
  calcRating() {
    this.stars = [];
    let rating = this.productData?.ratingsAverage;
    if (rating) {
      for (let i = 1; i <= 5; i++) {
        if (rating >= i) {
          this.stars.push('full');
        } else if (rating >= i - 0.5) {
          this.stars.push('half');
        } else {
          this.stars.push('empty');
        }
      }
    }
  }

  cartService = inject(CartService);
  addToCart(id: string) {
    this.showspin = true;
    this.cartService.addToCart(id).subscribe({
      next: (res) => {
        this.showspin = false;
        this.toast.showSucess(res.message);

        console.log(res);
      },
      error: (err) => {
        this.showspin = false;
      },
    });
  }
  getProduct() {
    this.activatedRoute.paramMap.subscribe({
      next: (res) => {
        this.productId = res.get('id');

        if (this.productId)
          this.productService.getProductDetails(this.productId).subscribe({
            next: (res) => {
              this.productData = res.data;
              this.calcRating();
              this.initializeSwiper();
            },
          });
      },
    });
  }
  initializeSwiper() {
    setTimeout(() => {
      if (this.swiperRef?.nativeElement) {
        Object.assign(this.swiperRef.nativeElement, this.swiperConfig);
        this.swiperRef.nativeElement.initialize();
      }
      if (this.swiper2?.nativeElement) {
        Object.assign(this.swiper2.nativeElement, this.swiper2Config);
        this.swiper2.nativeElement.initialize();
      }
      if (this.similarRef?.nativeElement) {
        Object.assign(this.similarRef.nativeElement, this.simlarRefConfig);
        this.similarRef.nativeElement.initialize();
      }
    }, 0);
  }

  swipePrev() {
    this.swiperRef.nativeElement.swiper.slidePrev();
  }

  swipeNext() {
    this.swiperRef.nativeElement.swiper.slideNext();
  }

  similarPrev() {
    this.similarRef.nativeElement.swiper.slidePrev();
  }

  similarNext() {
    this.similarRef.nativeElement.swiper.slideNext();
  }

  getAllProducts() {
    this.productService
      .getAllProducts({
        sort: '-price',
        limit: 20,
        category: this.productData?.category._id,
      })
      .subscribe({
        next: (response) => {
          this.productList = response.data;
          console.log(this.productList);
        },
      });
  }
}
