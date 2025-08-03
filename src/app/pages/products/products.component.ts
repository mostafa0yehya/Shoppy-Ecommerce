import { Component, HostListener, inject, OnInit } from '@angular/core';
import { SliderModule } from 'primeng/slider';
import { FormsModule } from '@angular/forms';
import { ProductsFilter } from '../../shared/interfaces/products-filter';
import { ProductService } from '../../core/services/product.service';
import { PaginatorModule } from 'primeng/paginator';
import { Product } from '../../shared/interfaces/product';
import { ProductComponent } from '../../shared/components/business/product/product.component';
import { Category } from '../../shared/interfaces/category';
import { CategoriesService } from '../../core/services/categories.service';
import { SelectModule } from 'primeng/select';
import { SelectButtonModule } from 'primeng/selectbutton';
import { AccordionModule } from 'primeng/accordion';
import { DrawerModule } from 'primeng/drawer';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [
    SliderModule,
    FormsModule,
    PaginatorModule,
    ProductComponent,
    SelectModule,
    SelectButtonModule,
    AccordionModule,
    DrawerModule,
    RouterLink,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  productsService = inject(ProductService);
  categoryService = inject(CategoriesService);
  productList: Product[] | null = null;
  categories: Category[] | null = null;

  rangeValues = [0, 20000];
  //pagination vairables
  totalRecords = 0;
  first = 0;
  rows = 20;
  //pagination vairables

  //filter parameters
  param: ProductsFilter = {
    page: 1,
    limit: 20,
  };
  visible = false;
  getAllProducts() {
    this.productsService.getAllProducts(this.param).subscribe({
      next: (res) => {
        this.productList = res.data;
        this.totalRecords = res.results;
      },
    });
  }

  ngOnInit(): void {
    this.getAllProducts();
    this.getCategories();
  }

  onPageChange(event: any) {
    this.param.page = event.page + 1;
    this.rows = event.rows;
    //limit importanttttt because we take value from row and send it to limit
    this.param.limit = event.rows;
    this.first = event.first;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    this.getAllProducts();
  }
  getCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res.data;
      },
    });
  }
  // select category configuration
  selectedcategory: Category | null = null;
  onSelectCategory(event: any) {
    if (event.value) {
      let category: Category = event.value;
      this.param.category = category._id;
      this.resetPage();

      this.getAllProducts();
    } else {
      this.param.category = '';
      this.resetPage();

      this.getAllProducts();
    }
  }
  resetPage() {
    this.totalRecords = 0;
    this.first = 0;
    this.rows = 10;
    this.param.page = 1;
  }

  applyPrice() {
    this.param.from = this.rangeValues[0];
    this.param.to = this.rangeValues[1];
    this.resetPage();

    this.getAllProducts();
  }
  stateOptions = [
    {
      label: 'High to Low',
      value: '-price',
    },
    {
      label: 'Low to High',
      value: 'price',
    },
  ];
  onSortChange() {
    console.log(this.param);

    this.resetPage();
    this.getAllProducts();
  }

  clearAllFilters() {
    this.param = {};
    this.selectedcategory = null;
    this.rangeValues = [0, 20000];

    this.getAllProducts();
  }

  pageLinkSize = 5;
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.setPageLinkSize();
  }
  setPageLinkSize() {
    this.pageLinkSize = window.innerWidth < 768 ? 1 : 5;
  }

  closeCallback() {}
}
