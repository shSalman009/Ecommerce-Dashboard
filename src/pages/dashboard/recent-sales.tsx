import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { OrderType } from "@/types/orders";

export function RecentSales({ orders }: { orders: OrderType[] }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Recent Sales</CardTitle>
        <CardDescription>
          You made {orders.length} sales recently.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {orders.slice(0, 5).map((order) => (
            <div key={order.id} className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src="/avatars/01.png" alt="Avatar" />
                <AvatarFallback>
                  {order.user.name
                    .split(" ")
                    .map((name) => name[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {order.user.name}
                </p>
                <p className="text-sm text-muted-foreground">{order.email}</p>
              </div>
              <div className="ml-auto font-medium">
                +${order.total.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
