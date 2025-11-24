import type { ReactNode } from "react";
import HeadBar from "./HeadBar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <HeadBar
        userName="Juan Pérez"
        userRole="Coordinador"
        onLogout={handleLogout}
      />
      <main style={{ padding: 20 }}>{children}</main>
    </div>
  );
}
