import useAuth from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

function PublicRoutes() {
  const { authenticated } = useAuth();
  return !authenticated ? <Outlet /> : <Navigate to="/dashboard" />;
}

export default PublicRoutes;
