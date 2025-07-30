import { CartItemProduct } from "./cart-item-product";

export interface CartItem {
      count: number;
  _id: string;
  product: CartItemProduct;
  price: number;
}
