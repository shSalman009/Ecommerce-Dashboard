import { DataTable } from "@/components/ui/data-table";
import { productsFilterOptions } from "@/config/table.config";
import { useGetProductsQuery } from "@/features/products/productsApi";

import Loading from "@/components/ui/loading";
import { ProductType } from "@/types/products";
import { useNavigate } from "react-router-dom";
import { ProductsType, columns } from "./column";

export default function Index() {
  const { data, isLoading } = useGetProductsQuery() || {};
  const products: ProductsType[] =
    data?.payload.map((product: ProductType) => {
      return {
        slug: product.slug,
        id: product.id,
        category: product?.category?.name,
        name: product.name,
        image: product.images[0],
        stock: product.stock,
        status: product.stock > 0 ? "In Stock" : "Out of Stock",
        price: product.price,
      };
    }) || [];

  const navigate = useNavigate();
  const handleAddProduct = () => {
    navigate("/products/create");
  };

  return (
    <div className="py-4">
      {isLoading ? (
        <Loading />
      ) : (
        <DataTable
          columns={columns}
          data={products}
          title="Products"
          searchBy="name"
          filters={productsFilterOptions}
          addButton={true}
          buttonText="Create Product"
          handleAdd={handleAddProduct}
        />
      )}
    </div>
  );
}
