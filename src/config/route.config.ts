import { lazy } from "react";

export const protectedRoutes = [
  {
    key: "dashboard",
    path: "/dashboard",
    component: lazy(() => import("@/pages/dashboard")),
  },

  {
    key: "users",
    path: "/users",
    component: lazy(() => import("@/pages/users")),
  },
  {
    key: "brands",
    path: "/brands",
    component: lazy(() => import("@/pages/brands")),
  },
  {
    key: "categories",
    path: "/categories",
    component: lazy(() => import("@/pages/category")),
  },
  {
    key: "products-list",
    path: "/products/list",
    component: lazy(() => import("@/pages/products/list")),
  },
  {
    key: "products-create",
    path: "/products/create",
    component: lazy(() => import("@/pages/products/create")),
  },
  {
    key: "products-update",
    path: "/products/update/:slug",
    component: lazy(() => import("@/pages/products/update")),
  },
  {
    key: "orders",
    path: "/orders",
    component: lazy(() => import("@/pages/orders")),
  },
  {
    key: "order-details",
    path: "/orders/:id",
    component: lazy(() => import("@/pages/order-details")),
  },
  {
    key: "Blogs",
    path: "/blogs",
    component: lazy(() => import("@/pages/blogs")),
  },
  {
    key: "blog-create",
    path: "/blogs/create",
    component: lazy(() => import("@/pages/blogs/create")),
  },
  {
    key: "blog-update",
    path: "/blogs/update/:id",
    component: lazy(() => import("@/pages/blogs/update")),
  },
];

export const publicRoutes = [
  {
    key: "sign-in",
    path: "/sign-in",
    component: lazy(() => import("@/pages/sign-in")),
  },
];
