import { FilterOption } from "@/types/table";
import { Table } from "@tanstack/react-table";
import { DoorClosed, PlusCircle } from "lucide-react";
import { Button } from "../button";
import { Input } from "../input";
import { DataTableFacetedFilter } from "./DataTableFacedFilter";
import { DataTableViewOptions } from "./DataTableViewOptions";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  title: string;
  searchBy?: string;
  filters?: FilterOption[];
  addButton?: boolean;
  handleAdd?: () => void;
  buttonText?: string;
}

export function DataTableToolbar<TData>({
  table,
  title,
  searchBy,
  filters,
  addButton,
  handleAdd,
  buttonText,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between mb-6">
      <h2>{title}</h2>

      <div className="flex flex-1 items-center justify-end space-x-2">
        {searchBy && (
          <Input
            placeholder={`Search ${title}...`}
            value={
              (table.getColumn(searchBy)?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn(searchBy)?.setFilterValue(event.target.value)
            }
            className="h-10 w-[150px] lg:w-[250px]"
          />
        )}

        {filters?.map((filter) => {
          if (table.getColumn(filter.value)) {
            return (
              <DataTableFacetedFilter
                key={filter.value}
                column={table.getColumn(filter.value)}
                title={filter.title}
                options={filter.options}
              />
            );
          }
        })}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-10 px-2 lg:px-3"
          >
            Reset
            <DoorClosed className="ml-2 h-4 w-4" />
          </Button>
        )}
        <DataTableViewOptions table={table} />

        {addButton && (
          <Button onClick={handleAdd}>
            <PlusCircle className="mr-2 h-4 w-4" /> {buttonText ?? "Add"}
          </Button>
        )}
      </div>
    </div>
  );
}
