import { Button, Card, DatePicker, Form, Select } from "antd";
import { Filtros } from "../types/models";

const { RangePicker } = DatePicker;
const { Option } = Select;

interface ExpedientesFiltersProps {
  onFiltrar: (filtros: Filtros) => void;
  loading?: boolean;
}

export default function ExpedientesFilters({ onFiltrar, loading = false }: ExpedientesFiltersProps) {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    const { estado, rangoFechas } = values;
    const nuevosFiltros: Filtros = {
      estado: estado ?? "",
      fechaInicio: rangoFechas?.[0]?.format("YYYY-MM-DD") ?? "",
      fechaFin: rangoFechas?.[1]?.format("YYYY-MM-DD") ?? "",
    };
    onFiltrar(nuevosFiltros);
  };

  return (
    <Card
      variant="outlined"
      className="mb-6 shadow-sm rounded-xl bg-white"
      bodyStyle={{ padding: "1.25rem 1.5rem" }}
    >
      <h3 className="text-base font-semibold text-gray-700 mb-3">
        Filtros de búsqueda
      </h3>

      <Form
        form={form}
        layout="inline"
        onFinish={handleSubmit}
        className="flex flex-wrap gap-4"
      >
        <Form.Item name="estado" className="!mb-2">
          <Select
            placeholder="Estado"
            allowClear
            className="min-w-[180px]"
          >
            <Option value="">Todos</Option>
            <Option value="REG">Registrado</Option>
            <Option value="PROC">En revisión</Option>
            <Option value="FINAL">Aprobado</Option>
            <Option value="REJ">Rechazado</Option>
          </Select>
        </Form.Item>

        <Form.Item name="rangoFechas" className="!mb-2">
          <RangePicker format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item className="!mb-2">
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="rounded-full px-6 font-semibold bg-[#1d4ed8] hover:!bg-[#1e40af] border-none"
          >
            Aplicar filtros
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}