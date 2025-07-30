import { CartDetails } from './cart-details';

export interface Cart {
  status: string;
  numOfCartItems: number;
  cartId: string;
  data: CartDetails;
}
