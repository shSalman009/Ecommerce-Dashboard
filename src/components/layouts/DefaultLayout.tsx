import AllRoutes from "@/components/routes/AllRoutes";
import Header from "@/components/templates/header/Header";
import Sidebar from "@/components/templates/sidebar/Sidebar";
import Loading from "@/components/ui/loading";
import { Suspense } from "react";

function DefaultLayout() {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 flex gap-2 w-full h-screen fixed inset-0">
      <Sidebar />

      <div className="h-full flex flex-col w-full">
        <div className="my-2">
          <Header />
        </div>
        <div className="w-full h-full overflow-y-auto custom-scrollbar rounded p-4 bg-background">
          <Suspense fallback={<Loading />}>
            <AllRoutes />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default DefaultLayout;
