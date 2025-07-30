import { Component, inject, Input, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { ProductsFilter } from '../../shared/interfaces/products-filter';
import { Product } from '../../shared/interfaces/product';
import { ProductComponent } from '../../shared/components/business/product/product.component';
import { Category } from '../../shared/interfaces/category';
import { PaginatorModule } from 'primeng/paginator';
@Component({
  selector: 'app-category',
  imports: [ProductComponent, PaginatorModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent implements OnInit {
  @Input('id') id!: string;
  param!: ProductsFilter;
  productService = inject(ProductService);
  productsList: Product[] | null = null;
  category: Category | null = null;

  //pagination parmas
  rows = 0;
  totalRecords = 0;
  first = 0;
  ngOnInit(): void {
    this.param = { category: this.id, limit: 10 };

    this.getAllProducts();
  }
  getAllProducts() {
    this.productService.getAllProducts(this.param).subscribe({
      next: (res) => {
        this.productsList = res.data;
        if (this.productsList) this.category = this.productsList[0].category;
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
}
