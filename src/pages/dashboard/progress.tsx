import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { OrderType } from "@/types/orders";

interface Props {
  percentage: number;
  numberOfOrdersCompleted: number;
}
const percentageOfCompletedOrders = (
  orders: OrderType[],
  days: number
): Props => {
  const completedOrders = orders.filter(
    (order) => order.status === "completed"
  );

  const completedOrdersInDays = completedOrders.filter((order) => {
    const orderDate = new Date(order.createdAt);
    const today = new Date();
    const diff = today.getTime() - orderDate.getTime();
    const diffInDays = diff / (1000 * 3600 * 24);
    return diffInDays <= days;
  });
  return {
    percentage:
      Math.round(
        (completedOrdersInDays.length / completedOrders.length) * 100
      ) || 0,
    numberOfOrdersCompleted: completedOrders.length || 0,
  };
};

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function Progress({ orders }: { orders: OrderType[] }) {
  const { percentage, numberOfOrdersCompleted } = percentageOfCompletedOrders(
    orders,
    7
  );

  return (
    <Card className="col-span-2 flex flex-col justify-between">
      <CardHeader>
        <CardTitle>Sales Progress Last 7 days</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        <div className="w-1/2">
          <CircularProgressbar value={percentage} text={`${percentage}%`} />
        </div>
      </CardContent>
      <CardFooter>
        <h5>
          {percentage}% of orders are completed out of {numberOfOrdersCompleted}{" "}
          orders
        </h5>
      </CardFooter>
    </Card>
  );
}

export default Progress;
