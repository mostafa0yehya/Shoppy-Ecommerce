import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { Product } from '../../../interfaces/product';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../../core/services/product.service';
import { CartService } from '../../../../core/services/cart.service';
import { WishlisButtonComponent } from '../../ui/wishlis-button/wishlis-button.component';
import { CartButtonComponent } from '../../ui/cart-button/cart-button.component';

@Component({
  selector: 'app-product',
  imports: [RouterLink, WishlisButtonComponent, CartButtonComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  productDesc: string[] = [];
  randomNumber = Math.floor(Math.random() * 20) + 1;
  productId: string | null = null;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    public productService: ProductService,
    public cartService: CartService
  ) {}

  @Input({ required: true }) product!: Product;

  ngOnDestroy(): void {}
}
