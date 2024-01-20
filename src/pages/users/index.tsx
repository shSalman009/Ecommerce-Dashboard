import { DataTable } from "@/components/ui/data-table";
import Loading from "@/components/ui/loading";
import { useGetUsersQuery } from "@/features/users/usersApi";
import { columns } from "./column";

function Index() {
  const { data, isLoading } = useGetUsersQuery() || {};

  const users = data?.payload || [];

  return (
    <div>
      {isLoading && <Loading />}
      {!isLoading && data && data.payload && (
        <DataTable
          columns={columns}
          data={users}
          title="Users"
          searchBy="name"
        />
      )}
    </div>
  );
}

export default Index;
