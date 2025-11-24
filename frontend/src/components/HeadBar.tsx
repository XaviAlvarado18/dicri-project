// src/components/HeadBar.tsx
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Avatar, Dropdown, Layout, Typography } from "antd";
import logoMP from "../../assets/MP_logo.png";

const { Header } = Layout;
const { Text } = Typography;

interface HeadBarProps {
  title?: string;
  userName: string;
  userRole: string;
  onLogout: () => void;
}

function getInitials(name: string) {
  if (!name) return "";
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? "";
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function HeadBar({
  title = "DICRI – Gestión de Evidencias",
  userName,
  userRole,
  onLogout,
}: HeadBarProps) {
  const items: MenuProps["items"] = [
    {
      key: "profile",
      label: "Perfil",
    },
    {
      key: "change-password",
      label: "Cambiar contraseña",
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: "Cerrar sesión",
      danger: true,
    },
  ];

  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "logout") onLogout();
  };

  return (
    <Header className="!px-4 md:!px-8 !h-14 flex items-center justify-between bg-gradient-to-r from-[#003366] to-[#2C76B5] shadow-md">

    <img 
        src={logoMP}
        alt="Logo MP"
        className="flex w-auto h-14 border-r-4 object-contain bg-white" 
        // className="w-8 mx-auto mb-4 object-contain"
    />

      {/* Título lado izquierdo */}
      <Text className="text-white text-sm md:text-base font-bold align-text-top">
        {title}
      </Text>

      {/* Usuario lado derecho */}
      <Dropdown
        menu={{ items, onClick: handleMenuClick }}
        trigger={["click"]}
        placement="bottomRight"
      >
        <button className="flex items-center gap-2 text-white focus:outline-none">
          <Avatar
            size="small"
            className="bg-[#1d4ed8] flex items-center justify-center"
            icon={!userName ? <UserOutlined /> : undefined}
          >
            {userName ? getInitials(userName) : null}
          </Avatar>

          <div className="hidden sm:flex flex-col text-left leading-tight">
            <span className="text-[11px] opacity-80">Usuario</span>
            <span className="text-xs md:text-sm font-semibold">
              {userRole} – {userName}
            </span>
          </div>

          <DownOutlined className="text-[10px]" />
        </button>
      </Dropdown>
    </Header>
  );
}
