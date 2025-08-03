import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { Brand } from '../../shared/interfaces/orders';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brands',
  imports: [RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent implements OnInit {
  brandsService = inject(BrandsService);
  brandsList: null | Brand[] = null;
  ngOnInit(): void {
    this.brandsService.getAllBrands().subscribe({
      next: (res) => {
        this.brandsList = res.data;
      },
    });
  }
}
