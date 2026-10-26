import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

const ProtectedRoute = () => {
  const accessToken = useAuthStore((state) => state.accessToken);

  return accessToken ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
