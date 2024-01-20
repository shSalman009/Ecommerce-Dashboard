import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OrderType } from "@/types/orders";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface SalesDataPoint {
  name: string;
  total: number;
}

const groupOrdersByMonth = (orders: OrderType[]): SalesDataPoint[] => {
  const groupedOrders: { [key: string]: SalesDataPoint } = {};

  // Calculate the date for 12 months ago
  const twelveMonthsAgo = new Date();
  twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

  // Filter out orders older than 12 months
  const recentOrders = orders.filter(
    (order) => new Date(order.createdAt) >= twelveMonthsAgo
  );

  recentOrders.forEach((order) => {
    const month = new Date(order.createdAt).toLocaleString("en-US", {
      month: "short",
    });

    if (groupedOrders[month]) {
      groupedOrders[month].total += order.total;
    } else {
      groupedOrders[month] = {
        name: month,
        total: order.total,
      };
    }
  });

  // Create an array of the last 12 months
  const last12Months = Array.from({ length: 12 }, (_, index) => {
    const date = new Date();
    date.setMonth(date.getMonth() - index);
    return date.toLocaleString("en-US", { month: "short" });
  });

  // Fill in sales data for each of the last 12 months, including those with no sales
  const salesData = last12Months.map(
    (month) => groupedOrders[month] || { name: month, total: 0 }
  );

  return salesData;
};

const groupOrdersByDay = (
  orders: OrderType[],
  days: number
): SalesDataPoint[] => {
  const groupedOrders: { [key: string]: SalesDataPoint } = {};

  let options = {
    month: "short",
    day: "numeric",
  } as Intl.DateTimeFormatOptions;

  if (days <= 30) {
    options = { day: "numeric" };
  }
  if (days <= 7) {
    options = { weekday: "short" };
  }

  // Calculate the date for 7 days ago
  const numberOfDaysAgo = new Date();
  numberOfDaysAgo.setDate(numberOfDaysAgo.getDate() - days);

  // Filter out orders older than 7 days
  const recentOrders = orders.filter(
    (order) => new Date(order.createdAt) >= numberOfDaysAgo
  );

  recentOrders.forEach((order) => {
    const day = new Date(order.createdAt).toLocaleString("en-US", options);

    if (groupedOrders[day]) {
      groupedOrders[day].total += order.total;
    } else {
      groupedOrders[day] = {
        name: day,
        total: order.total,
      };
    }
  });
  //   console.log(groupedOrders);

  // Create an array of the last 7 days
  const lastNumberOfDays = Array.from({ length: days }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - index);
    return date.toLocaleString("en-US", options);
  });
  //   console.log(lastNumberOfDays);

  // Fill in sales data for each of the last 7 days, including those with no sales
  const salesData = lastNumberOfDays.map(
    (day) => groupedOrders[day] || { name: day, total: 0 }
  );

  return salesData;
};

export default function Chart({ orders }: { orders: OrderType[] }) {
  const yearlyData = groupOrdersByMonth(orders);
  const monthlyData = groupOrdersByDay(orders, 30);
  const weeklyData = groupOrdersByDay(orders, 7);

  const data = [
    {
      name: "yearly",
      data: yearlyData,
      title: "Last 12 months",
    },
    {
      name: "monthly",
      data: monthlyData,
      title: "Last 30 days",
    },
    {
      name: "weekly",
      data: weeklyData,
      title: "Last 7 days",
    },
  ];

  return (
    <>
      <Card className="lg:col-span-5 col-span-2">
        <Tabs defaultValue="yearly">
          <CardHeader className="items-end">
            <TabsList>
              {data.map((tab) => (
                <TabsTrigger key={tab.name} value={tab.name}>
                  {tab.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </CardHeader>

          <CardContent className="pl-2">
            {data.map((tab) => (
              <TabsContent key={tab.name} value={tab.name}>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={tab.data}>
                    <XAxis
                      dataKey="name"
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Bar
                      dataKey="total"
                      fill="currentColor"
                      radius={[4, 4, 0, 0]}
                      className="fill-primary"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>
            ))}
          </CardContent>
        </Tabs>
      </Card>
    </>
  );
}
