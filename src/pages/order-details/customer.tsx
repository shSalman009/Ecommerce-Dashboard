import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { OrderType } from "@/types/orders";
import { UserType } from "@/types/user";
import { Mail } from "lucide-react";

interface Props {
  user: UserType;
  billingAddress: OrderType["billingAddress"];
  shippingAddress: OrderType["shippingAddress"];
}

function Customer({ user, billingAddress, shippingAddress }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Avatar */}
        <div className="flex space-x-2 items-start">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@user" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h6>{user.name}</h6>
        </div>

        <Separator className="my-2" />

        {/* Email */}
        <div className="flex gap-2 font-semibold items-center">
          <Mail size={16} />
          <p>{user.email}</p>
        </div>

        <Separator className="my-2" />

        {/* Shipping Address */}
        <div className="flex flex-col space-y-2">
          <h6 className="font-semibold">Shipping Address</h6>
          <p className="text-gray-700">{shippingAddress.street}</p>
          <p className="text-gray-700">{shippingAddress.city}</p>
          <p className="text-gray-700">{shippingAddress.state}</p>
          <p className="text-gray-700">{shippingAddress.zip}</p>
        </div>

        <Separator className="my-2" />

        {/* Billing Address */}
        <div className="flex flex-col space-y-2">
          <h6 className="font-semibold">Billing Address</h6>
          <p className="text-gray-700">{billingAddress.street}</p>
          <p className="text-gray-700">{billingAddress.city}</p>
          <p className="text-gray-700">{billingAddress.state}</p>
          <p className="text-gray-700">{billingAddress.zip}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default Customer;
