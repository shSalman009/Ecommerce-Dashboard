import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrderType } from "@/types/orders";

interface Props {
  products: OrderType["products"];
}

export function Products({ products }: Props) {
  //   console.log(products);

  return (
    <Table>
      <TableHeader className="bg-accent">
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead className="text-right">Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map(({ product, quantity, _id }) => (
          <TableRow key={_id}>
            <TableCell className="flex gap-1">
              <img className="w-20 rounded" src={product.images[0]} alt="" />
              <div className="flex flex-col space-y-1">
                <h4 className="text-base font-semibold">{product.name}</h4>
                <p className="text-sm text-gray-500">
                  Brand: <span className="font-semibold">{product.brand}</span>
                </p>
              </div>
            </TableCell>
            <TableCell>${product.price}.00</TableCell>
            <TableCell>{quantity}</TableCell>
            <TableCell className="text-right">
              ${product.price * quantity}.00
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
