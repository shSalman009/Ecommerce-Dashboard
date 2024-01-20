import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Loading from "@/components/ui/loading";
import { Separator } from "@/components/ui/separator";
import { useGetOrderQuery } from "@/features/orders/orderApi";
import { useParams } from "react-router-dom";
import Customer from "./customer";
import { Products } from "./products";

function OrderDetails() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isSuccess, isError } = useGetOrderQuery(id || "");
  const order = data?.payload;
  // console.log(order);

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && isError && (
        <div className="w-full text-center">
          <h4>Something went wrong</h4>
        </div>
      )}

      {!isLoading && isSuccess && order && (
        <div className="flex space-x-2">
          <div className="w-full">
            <div className="flex items-center gap-2 mb-2">
              <h3>Order #{id}</h3>
              <span
                className={`capitalize font-medium ${
                  order.status === "pending"
                    ? "text-yellow-500"
                    : "text-green-500"
                }`}
              >
                {order.status}
              </span>
            </div>
            <p className="mb-4">
              Order placed on{" "}
              <span className="font-bold">
                {new Date(order.createdAt).toDateString()}
              </span>
            </p>
            <Products products={order.products} />
            <Card>
              <CardHeader>
                <CardTitle>Payment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <div className="flex justify-between">
                  <p>Subtotal</p>
                  <p className="text-gray-600 font-semibold">
                    ${order.total - order.shippingCost}.00
                  </p>
                </div>
                <div className="flex justify-between">
                  <p>Shipping</p>
                  <p className="text-gray-600 font-semibold">
                    ${order.shippingCost}.00
                  </p>
                </div>
                <div className="flex justify-between">
                  <p>Tax</p>
                  <p className="text-gray-600 font-semibold">$0.00</p>
                </div>
                <div className="flex justify-between">
                  <p>Total</p>
                  <p className="text-gray-600 font-semibold">
                    ${order.total}.00
                  </p>
                </div>
              </CardContent>
              <Separator className="my-2" />
              <CardFooter>
                <div className="flex justify-between w-full">
                  <p className="font-semibold">Total</p>
                  <p className="text-gray-600 font-semibold">
                    ${order.total}.00
                  </p>
                </div>
              </CardFooter>
            </Card>
          </div>
          <div className="w-2/6">
            <Customer
              user={order.user}
              shippingAddress={order.shippingAddress}
              billingAddress={order.billingAddress}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default OrderDetails;
