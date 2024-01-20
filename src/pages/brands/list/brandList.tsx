import { DataTable } from "@/components/ui/data-table";
import Loading from "@/components/ui/loading";
import { useGetBrandsQuery } from "@/features/brands/brandsApi";
import { columns } from "./columns";

function BrandList({ handleShowForm }: { handleShowForm: () => void }) {
  const { data, isLoading } = useGetBrandsQuery();

  const brands = data?.payload || [];

  return (
    <div>
      {isLoading && <Loading />}
      {!isLoading && (
        <DataTable
          data={brands}
          title="Brands"
          columns={columns}
          addButton={true}
          handleAdd={handleShowForm}
          buttonText="Add Brand"
        />
      )}
    </div>
  );
}

export default BrandList;
