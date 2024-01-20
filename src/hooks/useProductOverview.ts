import { ProductType } from "@/types/products";
import { useEffect, useState } from "react";

interface ProductOverviewCalculations {
  totalProduct: number;
  lastMonthProduct: number;
  productPercentageChange: number;
}

const useProductOverview = (
  products: ProductType[]
): ProductOverviewCalculations => {
  const [calculations, setCalculations] = useState<ProductOverviewCalculations>(
    {
      totalProduct: 0,
      lastMonthProduct: 0,
      productPercentageChange: 0,
    }
  );

  useEffect(() => {
    const totalProduct = products.length;

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

    const lastMonthProducts = products.filter(
      (product) =>
        new Date(product.createdAt) >= lastMonthStart &&
        new Date(product.createdAt) <= lastMonthEnd
    );

    const lastMonthProduct = lastMonthProducts.length;

    const productPercentageChange = (lastMonthProduct / totalProduct) * 100;

    setCalculations({
      totalProduct,
      lastMonthProduct,
      productPercentageChange,
    });
  }, [products]);

  return calculations;
};

export default useProductOverview;
