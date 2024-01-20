import { CategoryType } from "./category";

export interface ProductType {
  id: string;
  name: string;
  slug: string;
  description: string;
  images: string[];
  price: number;
  discount: number;
  stock: number;
  sold: number;
  brand: string;
  category: CategoryType;
  features: string[];
  specifications: Record<string, string>;
  reviews: {
    user: string;
    rating: number;
    comment: string;
    date: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}
