// import { statuses } from "@/data/tableData
import { DataTableColumnHeader } from "@/components/ui/data-table/DataTableColumnHeader";
import { ColumnDef } from "@tanstack/react-table";

import { CategoryType } from "@/types/category";
import { format } from "date-fns";
import Actions from "./actions";

export const columns: ColumnDef<CategoryType>[] = [
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
    accessorKey: "slug",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Slug" />
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="CreatedAt" />
    ),
    cell({ row }) {
      const formattedDate = format(
        new Date(row.original.createdAt),
        "dd-MM-yyyy"
      );

      return <div>{formattedDate}</div>;
    },
  },

  {
    id: "actions",

    cell: ({ row }) => <Actions category={row.original} />,
  },
];
