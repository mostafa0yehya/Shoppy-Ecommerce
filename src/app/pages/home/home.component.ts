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
  productService = inject(ProductService);
  categoryService = inject(CategoriesService);
  @ViewChild('swiperRef') swiperRef!: ElementRef<SwiperContainer>;
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
  ngAfterViewInit() {
    Object.assign(this.swiperRef.nativeElement, this.swiperConfig);
    this.swiperRef.nativeElement.initialize();
  }
  categories: Category[] | null = null;
  productList: Product[] = [];

  constructor(private eRef: ElementRef) {}
  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res.data;
      },
    });
    this.productService
      .getAllProducts({ sort: '-price', limit: 60 })
      .subscribe({
        next: (response) => {
          console.log(response);

          this.productList = response.data.filter(
            (product: Product) =>
              product.priceAfterDiscount != null &&
              product.priceAfterDiscount > 0
          );
          console.log(this.productList);
        },
        // error: (error) => {
        //   console.log(error.error);
        // },
      });
  }
  swipePrev() {
    this.swiperRef.nativeElement.swiper.slidePrev();
  }

  swipeNext() {
    this.swiperRef.nativeElement.swiper.slideNext();
  }
}
