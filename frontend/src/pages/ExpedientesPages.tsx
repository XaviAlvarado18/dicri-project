import {
  DatePicker,
  Select,
  Typography
} from "antd";
import { useNavigate } from "react-router-dom";
import ExpedientesFilters from "../components/ExpedientesFilters";
import ExpedientesTable from "../components/ExpedientesTable";
import Layout from "../components/Layout";
import TableContainer from "../components/TableContainer";
import { useExpedientes } from "../hooks/useExpedientes";
import { FiltrosExpedientes } from "../services/expedientes.services";
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
  const navigate = useNavigate();
  const { expedientes, loading, recargar } = useExpedientes();

  // Cuando el usuario aplica filtros desde ExpedientesFilters
  const handleFiltrar = (nuevosFiltros: FiltrosExpedientes) => {
    // El hook se encarga de hacer la petición y actualizar el estado
    void recargar(nuevosFiltros);
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
