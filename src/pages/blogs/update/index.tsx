import Loading from "@/components/ui/loading";
import { useGetBlogQuery } from "@/features/blogs/blogApi";
import { useParams } from "react-router-dom";
import UpdateBlogForm from "./form";

function UpdateBlog() {
  const { id } = useParams();

  const { data, isLoading, isError, isSuccess } = useGetBlogQuery(id || "");

  const blog = data?.payload;

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && isError && (
        <div className="w-full text-center">
          <h4>Something went wrong</h4>
        </div>
      )}

      {!isLoading && isSuccess && blog && <UpdateBlogForm blog={blog} />}
    </>
  );
}

export default UpdateBlog;
