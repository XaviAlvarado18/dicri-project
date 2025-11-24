import type { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";
import HeadBar from "./HeadBar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {

  const { user } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <HeadBar
        userName={user?.nombre || "Usuario"}
        userRole={user?.rol || "ROL_DESCONOCIDO"}
        onLogout={handleLogout}
      />
      <main style={{ padding: 20 }}>{children}</main>
    </div>
  );
}
