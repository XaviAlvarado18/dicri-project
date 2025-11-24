import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ExpedienteDetallePage from "./pages/ExpedienteDetallePage";
import ExpedientesPage from "./pages/ExpedientesPages";
import LoginPage from "./pages/LoginPage";

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
};

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/expedientes"
          element={
            <PrivateRoute>
              <ExpedientesPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/expedientes/:id"
          element={
            <PrivateRoute>
              <ExpedienteDetallePage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/expedientes" />} />
      </Routes>
    </BrowserRouter>
  );
}
