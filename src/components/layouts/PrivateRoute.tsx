import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/app/hooks";

const PrivateRoute = () => {
  const token = useAppSelector((s) => s.auth.token);
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
