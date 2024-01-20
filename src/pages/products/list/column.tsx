import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/data-table/DataTableColumnHeader";
// import { statuses } from "@/data/tableData";
import { ColumnDef } from "@tanstack/react-table";
import Actions from "./actions";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductsType = {
  id: string;
  slug: string;
  category: string;
  name: string;
  image: string;
  stock: number;
  status: "In Stock" | "Out of Stock";
  price: number;
};

export const columns: ColumnDef<ProductsType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell({ row }) {
      return (
        <div className="flex gap-2 items-center">
          <img src={row.original.image} className="w-10 h-10 rounded" />
          <div className="truncate font-semibold">{row.original.name}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "stock",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Stock" />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const style =
        row.getValue("status") === "In Stock"
          ? "text-green-500"
          : "text-red-500";

      return (
        <div className="flex items-center">
          <span className={`font-semibold ${style}`}>
            {row.getValue("status")}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },

  {
    accessorKey: "price",
    // header: () => <div className="text-right">Price</div>,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);

      return <div className="font-medium">{formatted}</div>;
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const slug = row.original.slug;
      return <Actions slug={slug} />;
    },
  },
];
