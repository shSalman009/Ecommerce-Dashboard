import { DataTable } from "@/components/ui/data-table";
import Loading from "@/components/ui/loading";
import { useGetBlogsQuery } from "@/features/blogs/blogApi";
import { useNavigate } from "react-router-dom";
import { columns } from "./column";

function BlogList() {
  const { data, isLoading } = useGetBlogsQuery();

  const blogs = data?.payload || [];
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/blogs/create");
  };

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <DataTable
          columns={columns}
          data={blogs}
          title="Blogs"
          searchBy="title"
          addButton={true}
          buttonText="Create Blog"
          handleAdd={handleNavigate}
        />
      )}
    </div>
  );
}

export default BlogList;
