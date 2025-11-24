import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import type { Expediente } from "../types/models";

interface ExpedientesTableProps {
  expedientes: Expediente[];
  loading?: boolean;
}

export default function ExpedientesTable({ expedientes, loading = false }: ExpedientesTableProps) {
  const navigate = useNavigate();

  const columns: ColumnsType<Expediente> = [
    {
      title: "No. Expediente",
      dataIndex: "numeroExpediente",
      key: "numeroExpediente",
      width: 140,
      render: (_, record) => record.NumeroExpediente ?? record.IdExpediente,
    },
    {
      title: "Fecha de Registro",
      dataIndex: "fechaRegistro",
      key: "fechaRegistro",
      width: 160,
    },
    {
      title: "Estado",
      dataIndex: "estado",
      key: "estado",
      width: 140,
      render: (estado: string) => {
        let color = "default";
        if (estado === "APROBADO") color = "green";
        else if (estado === "RECHAZADO") color = "red";
        else if (estado === "EN_REVISION") color = "blue";
        else if (estado === "REGISTRADO") color = "gold";
        return <Tag color={color}>{estado ?? "—"}</Tag>;
      },
    },
    {
      title: "Técnico Registrador",
      dataIndex: "tecnicoRegistrador",
      key: "tecnicoRegistrador",
    },
  ];

  return (
    <Table
      rowKey="IdExpediente"
      columns={columns}
      dataSource={expedientes}
      pagination={false}
      loading={loading}
      className="mp-expedientes-table"
      onRow={(record) => ({
        onClick: () => navigate(`/expedientes/${record.IdExpediente}`),
        className: "cursor-pointer",
      })}
    />
  );
}