// import { statuses } from "@/data/tableData";
import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/ui/data-table/DataTableColumnHeader";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { UserType } from "@/types/user";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { User } from "lucide-react";
import EditForm from "./EditForm";

export const columns: ColumnDef<UserType>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell({ row }) {
      const { name } = row.original;
      return (
        <div className="flex gap-2 items-center">
          <div className="w-10 h-10 bg-gray-200 flex justify-center items-center rounded-full">
            <User />
          </div>
          <div className="truncate font-semibold">{name}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },

  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
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
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Updated At" />
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
    cell: ({ row }) => {
      const { id, name, email } = row.original;

      return (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Edit</Button>
          </SheetTrigger>
          <SheetContent>
            <EditForm id={id} name={name} email={email} />
          </SheetContent>
        </Sheet>
      );
    },
  },
];
