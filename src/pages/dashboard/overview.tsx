import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetProductsQuery } from "@/features/products/productsApi";
import { useGetUsersQuery } from "@/features/users/usersApi";
import useOrderOverview from "@/hooks/useOrderOverview";
import useProductOverview from "@/hooks/useProductOverview";
import useUserOverview from "@/hooks/useUserOverview";
import { OrderType } from "@/types/orders";
import { DollarSign, ShoppingBasket, User, Weight } from "lucide-react";
import { useMemo } from "react";

function Overview({ orders }: { orders: OrderType[] }) {
  const {
    totalRevenue,
    revenuePercentageChange,
    totalSales,
    salesPercentageChange,
  } = useOrderOverview(orders);

  const { data: usersData } = useGetUsersQuery();
  const users = usersData?.payload || [];

  const { totalUser, userPercentageChange } = useUserOverview(users);
  const { data: productsData } = useGetProductsQuery();
  const products = useMemo(
    () => productsData?.payload || [],
    [productsData?.payload]
  );
  const { totalProduct, productPercentageChange } =
    useProductOverview(products);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Revenue */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <Button variant="default-no-hover" className="bg-teal-500">
            <DollarSign className="h-4 w-4 text-white" strokeWidth={3} />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
          <p
            className={`text-xs ${
              revenuePercentageChange >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {revenuePercentageChange >= 0 ? "+" : "-"}
            {Math.abs(revenuePercentageChange).toFixed(1)}% from last month
          </p>
        </CardContent>
      </Card>

      {/* Sales */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Sales</CardTitle>
          <Button variant="default-no-hover" className="bg-indigo-500">
            <Weight className="h-4 w-4 text-white" strokeWidth={3} />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalSales}</div>
          <p
            className={`text-xs ${
              salesPercentageChange >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {salesPercentageChange >= 0 ? "+" : "-"}
            {Math.abs(salesPercentageChange).toFixed(1)}% from last month
          </p>
        </CardContent>
      </Card>

      {/* Products */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Products</CardTitle>
          <Button variant="default-no-hover" className="bg-fuchsia-500">
            <ShoppingBasket className="h-4 w-4 text-white" strokeWidth={3} />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalProduct}</div>
          <p
            className={`text-xs ${
              productPercentageChange >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {productPercentageChange >= 0 ? "+" : "-"}
            {Math.abs(productPercentageChange).toFixed(1)}% from last month
          </p>
        </CardContent>
      </Card>

      {/* Users */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Users</CardTitle>
          <Button variant="default-no-hover" className="bg-yellow-500">
            <User className="h-4 w-4 text-white" strokeWidth={3} />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalUser}</div>
          <p
            className={`text-xs ${
              userPercentageChange >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {userPercentageChange >= 0 ? "+" : "-"}
            {Math.abs(userPercentageChange).toFixed(1)}% from last month
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default Overview;
