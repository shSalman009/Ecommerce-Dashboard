import { DataTable } from "@/components/ui/data-table";
import Loading from "@/components/ui/loading";
import { useGetOrdersQuery } from "@/features/orders/orderApi";
import { columns } from "./columns";

function OrderList() {
  const { data, isLoading } = useGetOrdersQuery();

  const orders = data?.payload || [];

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <DataTable
          columns={columns}
          data={orders}
          title="Orders"
          searchBy="id"
        />
      )}
    </div>
  );
}

export default OrderList;
