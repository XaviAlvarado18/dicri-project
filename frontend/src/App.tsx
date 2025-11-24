// src/App.tsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ExpedienteDetallePage from "./pages/ExpedienteDetallePage";
import ExpedientesPage from "./pages/ExpedientesPages";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./router/PrivateRoute";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* pública */}
        <Route path="/login" element={<LoginPage />} />

        {/* protegidas (requieren estar logueado) */}
        <Route element={<PrivateRoute />}>
          <Route path="/expedientes" element={<ExpedientesPage />} />
          <Route path="/expedientes/:id" element={<ExpedienteDetallePage />} />
          {/* aquí puedes meter más rutas que requieran login */}
        </Route>

        {/* opcional: ruta por defecto */}
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}
