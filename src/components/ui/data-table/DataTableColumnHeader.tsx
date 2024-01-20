import { Column } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { ArrowUpDown, MoveDown, MoveUp } from "lucide-react";
import React from "react";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  const handleToggleSorting = () => {
    if (column.getIsSorted()) {
      column.toggleSorting();
    } else {
      column.toggleSorting(false);
    }
  };

  return (
    <Button
      onClick={handleToggleSorting}
      variant="ghost"
      size="sm"
      className="-ml-3 h-8 data-[state=open]:bg-accent font-bold"
    >
      <span>{title}</span>
      {column.getIsSorted() === "desc" ? (
        <MoveDown className="ml-2 h-4 w-4" />
      ) : column.getIsSorted() === "asc" ? (
        <MoveUp className="ml-2 h-4 w-4" />
      ) : (
        <ArrowUpDown className="ml-2 h-4 w-4" />
      )}
    </Button>
  );
}
