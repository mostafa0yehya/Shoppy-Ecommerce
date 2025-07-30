import { Component, inject } from '@angular/core';

import { BrandsService } from '../../../core/services/brands.service';
import { Brand } from '../../interfaces/whish-list-bag';

@Component({
  selector: 'app-brand-slider',
  imports: [],
  templateUrl: './brand-slider.component.html',
  styleUrl: './brand-slider.component.css',
})
export class BrandSliderComponent {
  brandsList: Brand[] | null = null;
  ngOnInit(): void {
    this.brandService.getAllBrands().subscribe({
      next: (res) => {
        this.brandsList = res.data;
      },
    });
  }

  brandService = inject(BrandsService);
}
