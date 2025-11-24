import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import type { Expediente } from "../types/models";

interface ExpedientesTableProps {
  expedientes: Expediente[];
  loading?: boolean;
}

export default function ExpedientesTable({
  expedientes,
  loading = false,
}: ExpedientesTableProps) {
  const navigate = useNavigate();

  const columns: ColumnsType<Expediente> = [
    {
      title: "No. Expediente",
      dataIndex: "NumeroExpediente",
      key: "NumeroExpediente",
      width: 160,
      render: (_, record) =>
        record.NumeroExpediente ?? record.IdExpediente,
    },
    {
      title: "Fecha de Registro",
      dataIndex: "FechaRegistro",
      key: "FechaRegistro",
      width: 200,
      render: (value: string) => {
        if (!value) return "—";
        const fecha = new Date(value);
        return fecha.toLocaleString("es-GT", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        });
      },
    },
    {
      title: "Estado",
      dataIndex: "EstadoCodigo",
      key: "EstadoCodigo",
      width: 160,
      render: (_: string, record) => {
        const codigo = record.EstadoCodigo; // FINAL, REJ, PROC, REG...
        let color: string = "default";
        let label = codigo;

        console.warn("Estado código:", codigo);

        switch (codigo) {
          case "REG":
            color = "gold";
            label = "REGISTRADO";
            break;
          case "PROC":
            color = "blue";
            label = "EN REVISIÓN";
            break;
          case "FINAL":
            color = "green";
            label = "APROBADO";
            break;
          case "REJ":
            color = "red";
            label = "RECHAZADO";
            break;
        }

        return <Tag color={color}>{label}</Tag>;
      },
    },
    {
      title: "Técnico Registrador",
      dataIndex: "NombreTecnicoRegistro",
      key: "NombreTecnicoRegistro",
      render: (value: string) => value ?? "—",
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
