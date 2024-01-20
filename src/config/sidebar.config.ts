import { SidebarItemsInterface } from "@/types/sidebar";
import {
  BaggageClaim,
  Hexagon,
  LayoutDashboard,
  Network,
  PenSquare,
  ShoppingBasket,
  Users,
} from "lucide-react";

export const sidebarItems: SidebarItemsInterface[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    title: "Users",
    icon: Users,
    path: "/users",
  },
  {
    title: "Products",
    icon: ShoppingBasket,
    children: [
      {
        title: "Product List",
        path: "/products/list",
      },
      {
        title: "Create Product",
        path: "/products/create",
      },
    ],
  },
  {
    title: "Orders",
    icon: BaggageClaim,
    path: "/orders",
  },
  {
    title: "Categories",
    icon: Network,
    path: "/categories",
  },
  {
    title: "Brands",
    icon: Hexagon,
    path: "/brands",
  },
  {
    title: "Blogs",
    icon: PenSquare,
    path: "/blogs",
  },
];
