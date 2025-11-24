import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface PrivateRouteProps {
  allowedRoles?: string[]; // opcional, por si luego quieres limitar por rol
}

export default function PrivateRoute({ allowedRoles }: PrivateRouteProps) {
  const { user, token } = useAuth();
  const location = useLocation();

  // 1. Si no hay token o usuario → mandar a login
  if (!token || !user) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }} // útil si luego quieres volver
        replace
      />
    );
  }

  // 2. Si se especifican roles permitidos y el usuario no está en ellos
  if (allowedRoles && !allowedRoles.includes(user.rol)) {
    return <Navigate to="/no-autorizado" replace />;
  }

  // 3. Usuario autenticado (y autorizado) → mostrar rutas hijas
  return <Outlet />;
}
