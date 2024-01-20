// useOrderOverview.ts
import { OrderType } from "@/types/orders";
import { useEffect, useState } from "react";

interface OrderOverviewCalculations {
  totalRevenue: number;
  lastMonthRevenue: number;
  revenuePercentageChange: number;
  totalSales: number;
  lastMonthSales: number;
  salesPercentageChange: number;
}

const useOrderOverview = (orders: OrderType[]): OrderOverviewCalculations => {
  const [calculations, setCalculations] = useState<OrderOverviewCalculations>({
    totalRevenue: 0,
    lastMonthRevenue: 0,
    revenuePercentageChange: 0,
    totalSales: 0,
    lastMonthSales: 0,
    salesPercentageChange: 0,
  });

  useEffect(() => {
    const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);

    const currentDate = new Date();
    const lastMonthStart = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );
    const lastMonthEnd = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    );

    const lastMonthOrders = orders.filter(
      (order) =>
        new Date(order.createdAt) >= lastMonthStart &&
        new Date(order.createdAt) <= lastMonthEnd
    );

    const lastMonthRevenue = lastMonthOrders.reduce(
      (acc, order) => acc + order.total,
      0
    );

    const revenuePercentageChange = (lastMonthRevenue / totalRevenue) * 100;

    const totalSales = orders.reduce(
      (acc, order) =>
        acc + order.products.reduce((pAcc, p) => pAcc + p.quantity, 0),
      0
    );

    const lastMonthSales = lastMonthOrders.reduce(
      (acc, order) =>
        acc + order.products.reduce((pAcc, p) => pAcc + p.quantity, 0),
      0
    );

    const salesPercentageChange = (lastMonthSales / totalSales) * 100;

    setCalculations({
      totalRevenue,
      lastMonthRevenue,
      revenuePercentageChange,
      totalSales,
      lastMonthSales,
      salesPercentageChange,
    });
  }, [orders]);

  return calculations;
};

export default useOrderOverview;
