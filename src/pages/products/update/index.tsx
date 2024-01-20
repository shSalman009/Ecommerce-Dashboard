import Loading from "@/components/ui/loading";
import { useGetProductBySlugQuery } from "@/features/products/productsApi";
import { useParams } from "react-router-dom";
import UpdateProductForm from "./form";

function UpdateProduct() {
  const { slug } = useParams<{ slug: string }>();

  const { data, isLoading, isSuccess, isError } = useGetProductBySlugQuery(
    slug || ""
  );
  const product = data?.payload;

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && isError && (
        <div className="w-full text-center">
          <h4>Something went wrong</h4>
        </div>
      )}

      {!isLoading && isSuccess && product && (
        <UpdateProductForm product={product} />
      )}
    </>
  );
}

export default UpdateProduct;
