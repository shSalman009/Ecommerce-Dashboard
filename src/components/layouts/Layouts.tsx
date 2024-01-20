import useAuth from "@/hooks/useAuth";
import AuthLayout from "./AuthLayout";
import DefaultLayout from "./DefaultLayout";

function Layout() {
  const { authenticated } = useAuth();

  const layout = authenticated ? <DefaultLayout /> : <AuthLayout />;

  return <>{layout}</>;
}

export default Layout;
