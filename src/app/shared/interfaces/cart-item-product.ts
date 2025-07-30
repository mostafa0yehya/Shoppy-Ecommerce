import { Category } from "./category";
import { SubCategory } from "./sub-category";

export interface CartItemProduct {
      subcategory: SubCategory[];
  _id: string;
  title: string;
  quantity: number;
  imageCover: string;
  category: Category;
  brand: Category;
  ratingsAverage: number;
  id: string;
}
