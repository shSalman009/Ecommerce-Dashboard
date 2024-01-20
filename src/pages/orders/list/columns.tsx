// import { statuses } from "@/data/tableData
import { DataTableColumnHeader } from "@/components/ui/data-table/DataTableColumnHeader";
import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { OrderType } from "@/types/orders";
import { format } from "date-fns";
import Actions from "./actions";

export const columns: ColumnDef<OrderType>[] = [
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
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order" />
    ),
    cell({ row }) {
      return <div className="truncate font-semibold">#{row.original.id}</div>;
    },
  },

  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell({ row }) {
      const formattedDate = format(
        new Date(row.original.createdAt),
        "dd/MM/yyyy"
      );

      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const style =
        row.getValue("status") === "completed"
          ? "text-green-500"
          : "text-yellow-500";

      return (
        <span className={`font-semibold capitalize ${style}`}>
          {row.getValue("status")}
        </span>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "total",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total" />
    ),
    cell({ row }) {
      return <div className="font-semibold">${row.original.total}.00</div>;
    },
  },
  {
    id: "actions",

    cell: ({ row }) => <Actions id={row.original.id} />,
  },
];
