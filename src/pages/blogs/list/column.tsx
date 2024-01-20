// import { statuses } from "@/data/tableData
import { DataTableColumnHeader } from "@/components/ui/data-table/DataTableColumnHeader";
import { ColumnDef } from "@tanstack/react-table";

import { BlogType } from "@/types/blog";
import { format } from "date-fns";
import Actions from "./actions";

export const columns: ColumnDef<BlogType>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell({ row }) {
      return (
        <div className="flex gap-2 items-center">
          <img src={row.original.image} className="w-10 h-10 rounded" />
          <div className="truncate font-semibold">{row.original.title}</div>
        </div>
      );
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
        "dd-MM-yyyy"
      );

      return <div>{formattedDate}</div>;
    },
  },

  {
    id: "actions",

    cell: ({ row }) => <Actions blog={row.original} />,
  },
];
