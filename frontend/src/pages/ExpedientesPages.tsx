import {
  DatePicker,
  Select,
  Tag,
  Typography
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/client";
import ExpedientesFilters from "../components/ExpedientesFilters";
import ExpedientesTable from "../components/ExpedientesTable";
import Layout from "../components/Layout";
import TableContainer from "../components/TableContainer";
import type { Expediente } from "../types/models";
// Si quieres seguir usando tus cards individuales, las puedes dejar:

const { Title } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

interface Filtros {
  estado: string;
  fechaInicio: string;
  fechaFin: string;
}

export default function ExpedientesPage() {
  const [expedientes, setExpedientes] = useState<Expediente[]>([]);
  const [filtros, setFiltros] = useState<Filtros>({
    estado: "",
    fechaInicio: "",
    fechaFin: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const cargarExpedientes = async (f: Filtros = filtros) => {
    setLoading(true);
    try {
      const res = await api.get<Expediente[]>("/expedientes", { params: f });
      setExpedientes(res.data);
      setFiltros(f);
    } finally {
      setLoading(false);
    }
  };

  const cargar = async (f: Filtros = filtros) => {
    setLoading(true);
    try {
      const res = await api.get<Expediente[]>("/expedientes", {
        params: f,
      });
      setExpedientes(res.data);
      setFiltros(f);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void cargar();
  }, []);

  const handleFilterSubmit = (values: any) => {
    const { estado, rangoFechas } = values;
    const nuevoFiltro: Filtros = {
      estado: estado ?? "",
      fechaInicio: rangoFechas?.[0]?.format("YYYY-MM-DD") ?? "",
      fechaFin: rangoFechas?.[1]?.format("YYYY-MM-DD") ?? "",
    };
    void cargar(nuevoFiltro);
  };

  // Tabla estilo "Indicios registrados…" / "Expedientes"
  // Ajusta los nombres de campos según tu modelo real de Expediente.
  const columns: ColumnsType<any> = [
    {
      title: "No. Expediente",
      dataIndex: "numeroExpediente", // o "NoExpediente" / lo que uses
      key: "numeroExpediente",
      width: 140,
      render: (_, record) => record.numeroExpediente ?? record.IdExpediente,
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

   const handleFiltrar = (nuevosFiltros: Filtros) => {
    void cargarExpedientes(nuevosFiltros);
  };


  return (
    <Layout>
      {/* Contenedor principal como en la imagen: ancho máximo y fondo claro */}
      <div className="px-4 md:px-8 lg:px-16 py-6 bg-[#D5DCE2] min-h-screen">
        <div className="max-w-6xl mx-auto">
          {/* Título de página */}
          <Title
            level={3}
            className="!mb-6 !text-2xl !font-semibold text-gray-800"
          >
            Gestión de Evidencias - Expedientes DICRI
          </Title>

          {/* Componente de Filtros */}
          <ExpedientesFilters 
            onFiltrar={handleFiltrar} 
            loading={loading} 
          />

          {/* Componente de Tabla con Contenedor */}
          <TableContainer titulo="Expedientes registrados en el sistema">
            <ExpedientesTable 
              expedientes={expedientes} 
              loading={loading} 
            />
            
            {expedientes.length === 0 && !loading && (
              <p className="text-center text-gray-500 py-6">
                No se encontraron expedientes con los filtros seleccionados.
              </p>
            )}
          </TableContainer>


        </div>
      </div>
    </Layout>
  );
}
