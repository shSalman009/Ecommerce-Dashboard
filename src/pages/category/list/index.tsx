import { DataTable } from "@/components/ui/data-table";
import Loading from "@/components/ui/loading";
import { useGetCategoriesQuery } from "@/features/category/categoryApi";
import { columns } from "./column";

function List({ handleShowForm }: { handleShowForm: () => void }) {
  const { data, isLoading } = useGetCategoriesQuery();

  const categories = data?.payload || [];

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <DataTable
          columns={columns}
          data={categories}
          title="Categories"
          searchBy="name"
          addButton={true}
          buttonText="Add Category"
          handleAdd={handleShowForm}
        />
      )}
    </div>
  );
}

export default List;
