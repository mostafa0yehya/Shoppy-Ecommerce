import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../shared/interfaces/product';
import { ProductsFilter } from '../../shared/interfaces/products-filter';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  getAllProducts(parm?: ProductsFilter): Observable<any> {
    let params = new HttpParams();
    if (parm?.page) {
      params = params.set('page', parm.page);
    }
    if (parm?.limit) {
      params = params.set('limit', parm.limit);
    }
    if (parm?.sort) {
      params = params.set('sort', parm.sort);
    }

    if (parm?.from) {
      params = params.set('price[gte]', parm.from);
    }
    if (parm?.to) {
      params = params.set('price[lte]', parm.to);
    }

    if (parm?.category) {
      params = params.set('category[in]', parm.category);
    }
    if (parm?.brand) {
      params = params.set('brand', parm.brand);
    }
    console.log(params);

    return this.httpClient.get(
      `https://ecommerce.routemisr.com/api/v1/products`,
      { params }
    );
  }
  getProductDetails(id: string): Observable<any> {
    return this.httpClient.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
  }

  productDiscount(product: Product) {
    if (product.priceAfterDiscount) {
      const discount =
        ((product.price - product.priceAfterDiscount) / product.price) * 100;
      return Math.round(discount);
    } else {
      return 0;
    }
  }
}
