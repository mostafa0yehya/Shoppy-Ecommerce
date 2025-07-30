import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';
import { SwiperContainer } from 'swiper/element';
import { environment } from '../../../../core/environment/authorInfo';

import { AuthServiceService } from '../../../../core/services/auth-service.service';

import { RouterLink, RouterLinkActive } from '@angular/router';
import { BadgeModule } from 'primeng/badge';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { CartService } from '../../../../core/services/cart.service';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, OverlayBadgeModule, BadgeModule, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NavbarComponent {
  numberOfCartItems = 0;
  isLoggedIn = false;
  authorInfo = environment.authorInfo;
  // categories: Category[] | null = null;
  // allSubCategoires: SubCategory[] = [];
  // activeLinkId = '';
  // showMega = '';
  // megaSubCategory: SubCategory[] = [];
  // categoryOfSub: Category | null = null;
  // swiperConfig: SwiperOptions = {
  //   breakpoints: {
  //     0: {
  //       slidesPerView: 1,
  //     },
  //     480: {
  //       slidesPerView: 2,
  //     },
  //     768: {
  //       slidesPerView: 3,
  //     },
  //     1024: {
  //       slidesPerView: 6,
  //     },
  //   },
  //   spaceBetween: 10,
  // };
  @ViewChild('swiperRef') swiperRef!: ElementRef<SwiperContainer>;

  constructor(
    private auth: AuthServiceService,
    // private categoriesService: CategoriesService,
    // private subCategoryService: SubCategoryService,
    // private eRef: ElementRef,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.cartService.numberOfCartItemsSubject.subscribe({
      next: (res) => {
        this.numberOfCartItems = res;
      },
    });

    this.auth.isLoggedIn.subscribe({
      next: (value) => {
        this.isLoggedIn = value;
        if (this.isLoggedIn) {
          this.cartService.updateNumberOfCartItems();
        }
      },
    });

    // this.categoriesService.getAllCategories().subscribe({
    //   next: (res) => {
    //     this.categories = res.data;
    //   },
    // });

    // this.subCategoryService.getAllSub().subscribe({
    //   next: (res) => {
    //     this.allSubCategoires = res.data;
    //   },
    // });
  }
  // ngAfterViewInit() {
  //   Object.assign(this.swiperRef.nativeElement, this.swiperConfig);
  //   this.swiperRef.nativeElement.initialize();
  // }
  isOpen = false;

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  // handleCategoryClick(category: Category) {
  //   if (category._id == this.showMega) {
  //     this.hideMegaAndActiveLink();
  //   } else {
  //     this.showMegaAndActiveLink(category);
  //   }
  //   this.megaSubCategory = this.allSubCategoires.filter(
  //     (sub) => sub.category == category._id
  //   );
  // }

  logOut() {
    this.auth.logOut();
  }
  // swipePrev() {
  //   this.swiperRef.nativeElement.swiper.slidePrev();
  // }

  // swipeNext() {
  //   this.swiperRef.nativeElement.swiper.slideNext();
  // }
  isBodyScroll = false;
  @HostListener('window:scroll', [])
  handleClickOutside() {
    this.isBodyScroll = window.scrollY > 100;
    // if (!this.eRef.nativeElement.contains(event.target)) {
    //   this.hideMegaAndActiveLink();
    // }
  }

  // hideMegaAndActiveLink() {
  //   this.showMega = '';
  //   this.activeLinkId = '';
  // }

  // showMegaAndActiveLink(category: Category) {
  //   this.activeLinkId = category._id;
  //   this.showMega = category._id;
  //   this.categoryOfSub = category;
  // }
}
