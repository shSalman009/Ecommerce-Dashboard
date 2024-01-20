import { ProductType } from "./products";
import { UserType } from "./user";

export interface OrderType {
  id: string;
  user: UserType;
  email: string;
  shippingCost: number;
  total: number;
  status: "pending" | "completed";
  paymentDetails: {
    cardHolder: string;
    cardNumber: string;
    cardExpiration: string;
    cardCVC: string;
  };
  billingAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  products: {
    _id: string;
    product: ProductType;
    quantity: number;
  }[];
  createdAt: string;
  updatedAt: string;
}
