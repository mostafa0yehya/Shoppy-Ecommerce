import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { PLATFORM_ID, Inject } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main-slider',
  imports: [RouterLink],
  templateUrl: './main-slider.component.html',
  styleUrl: './main-slider.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MainSliderComponent implements AfterViewInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  @ViewChild('swiper') swiperContainer!: ElementRef;
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const swiperEl = this.swiperContainer.nativeElement;

      const params = {
        injectStyles: [
          `
        .swiper-pagination-bullet {
          width: 20px;
          height: 20px;
          text-align: center;
          line-height: 20px;
          font-size: 12px;
          color: #000;
          opacity: 1;
          background: white;
        }

      
           .swiper-pagination-bullet-active {
          background: #D91656;
        }
      `,
        ],
        pagination: {
          clickable: true,
        },
        effect: 'fade',
        speed: 500,
        slidesPerView: 1,
        loop: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
      };
      Object.assign(swiperEl, params);
      swiperEl.initialize();
    }
  }
}
