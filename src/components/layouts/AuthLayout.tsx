import AllRoutes from "@/components/routes/AllRoutes";
import Loading from "@/components/ui/loading";
import { Suspense } from "react";

function AuthLayout() {
  return (
    <Suspense fallback={<Loading />}>
      <AllRoutes />
    </Suspense>
  );
}

export default AuthLayout;
