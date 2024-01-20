import { Navigate, Route, Routes } from "react-router-dom";
import { protectedRoutes, publicRoutes } from "../../config/route.config";
import ProtectedRoutes from "./ProtectedRoutes";
import PublicRoutes from "./PublicRoutes";

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />

      <Route path="/" element={<ProtectedRoutes />}>
        {protectedRoutes.map((route) => (
          <Route
            key={route.key}
            path={route.path}
            element={<route.component />}
          />
        ))}
      </Route>
      <Route path="/" element={<PublicRoutes />}>
        {publicRoutes.map((route) => (
          <Route
            key={route.key}
            path={route.path}
            element={<route.component />}
          />
        ))}
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default AllRoutes;
