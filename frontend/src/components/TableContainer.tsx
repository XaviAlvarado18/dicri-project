import { Card } from "antd";
import { ReactNode } from "react";

interface TableContainerProps {
  titulo: string;
  children: ReactNode;
  className?: string;
}

export default function TableContainer({ 
  titulo, 
  children, 
  className = "" 
}: TableContainerProps) {
  return (
    <Card
      bordered={false}
      className={`shadow-sm rounded-xl overflow-hidden ${className}`}
      bodyStyle={{ padding: 0 }}
    >
      {/* Barra azul superior */}
      <div className="px-6 py-3 bg-[#1B375C]">
        <h3 className="text-white font-semibold">{titulo}</h3>
      </div>

      {/* Contenido */}
      <div className="p-4">{children}</div>
    </Card>
  );
}