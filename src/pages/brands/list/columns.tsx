// import { statuses } from "@/data/tableData
import { DataTableColumnHeader } from "@/components/ui/data-table/DataTableColumnHeader";

import { BrandType } from "@/types/brands";
import { ColumnDef } from "@tanstack/react-table";
import Actions from "./actions";

export const columns: ColumnDef<BrandType>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    id: "actions",

    cell: ({ row }) => <Actions brand={row.original} />,
  },
];
