import { Category } from "./category";
import { SubCategory } from "./sub-category";

export interface Product {
  sold: number;
  images: string[];
  subcategory: SubCategory[];
  ratingsQuantity: number;

  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  priceAfterDiscount?: number;
  imageCover: string;
  category: Category;
  brand: Category;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  id: string;
}



