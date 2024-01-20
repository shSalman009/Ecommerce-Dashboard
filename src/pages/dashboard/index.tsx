import Loading from "@/components/ui/loading";
import { useGetOrdersQuery } from "@/features/orders/orderApi";
import Chart from "./chart";
import Overview from "./overview";
import Progress from "./progress";
import { RecentSales } from "./recent-sales";

export default function Dashboard() {
  const { data, isLoading, isSuccess } = useGetOrdersQuery();
  const orders = data?.payload || [];

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && isSuccess && (
        <div className="flex-col flex">
          <div className="flex-1 space-y-4">
            <Overview orders={orders} />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Chart orders={orders} />
              <Progress orders={orders} />
            </div>
            <RecentSales orders={orders} />
          </div>
        </div>
      )}
    </>
  );
}
