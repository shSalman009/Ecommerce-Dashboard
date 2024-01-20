import useAuth from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes() {
  const { authenticated } = useAuth();
  return authenticated ? <Outlet /> : <Navigate to="/sign-in" />;
}

export default ProtectedRoutes;
