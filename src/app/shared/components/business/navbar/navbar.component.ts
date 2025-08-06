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
  isBodyScroll = false;
  isOpen = false;
  @ViewChild('swiperRef') swiperRef!: ElementRef<SwiperContainer>;

  constructor(
    private auth: AuthServiceService,

    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.subscribeInCartSubject();
    this.auth.isLoggedIn.subscribe({
      next: (value) => {
        this.isLoggedIn = value;
        if (this.isLoggedIn) {
          this.cartService.updateNumberOfCartItems();
        }
      },
    });
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  @HostListener('window:scroll', [])
  navbarSize() {
    this.isBodyScroll = window.scrollY > 100;
  }

  logOut() {
    this.auth.logOut();
  }

  subscribeInCartSubject() {
    this.cartService.numberOfCartItemsSubject.subscribe({
      next: (res) => {
        this.numberOfCartItems = res;
      },
    });
  }

  @ViewChild('mobileMenu') mobileMenuRef!: ElementRef;

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const clickedInside = this.mobileMenuRef?.nativeElement.contains(
      event.target
    );
    const clickedButton = (event.target as HTMLElement).closest('button');

    if (!clickedInside && !clickedButton) {
      this.isOpen = false;
    }
  }
}
