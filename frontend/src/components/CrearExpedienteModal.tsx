import { DatePicker, Form, Input, message, Modal } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { crearExpedienteService } from "../services/expedientes.services"; // ajusta la ruta si tu archivo se llama distinto

interface CrearExpedienteModalProps {
  open: boolean;
  onClose: () => void;
  onCreated: () => void; // para recargar la lista después de crear
}

export default function CrearExpedienteModal({
  open,
  onClose,
  onCreated,
}: CrearExpedienteModalProps) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      setLoading(true);

      await crearExpedienteService({
        numeroExpediente: values.numeroExpediente,
        // El backend hace new Date(fechaRegistro), así que mandamos ISO
        fechaRegistro: values.fechaRegistro.toISOString(),
      });

      message.success("Expediente creado correctamente");
      form.resetFields();
      onCreated(); // recargar lista en la página
      onClose();
    } catch (err: any) {
      if (err?.errorFields) {
        // error de validación del form, no hacemos nada más
        return;
      }
      message.error(
        err?.response?.data?.message ??
          "Ocurrió un error al crear el expediente"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      title="Nuevo expediente"
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={loading}
      okText="Crear expediente"
      cancelText="Cancelar"
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          fechaRegistro: dayjs(), // ahora
        }}
      >
        <Form.Item
          label="Número de expediente"
          name="numeroExpediente"
          rules={[
            { required: true, message: "Ingresa el número de expediente" },
            { max: 50, message: "Máximo 50 caracteres" },
          ]}
        >
          <Input placeholder="Ej: EXP-2025-004" />
        </Form.Item>

        <Form.Item
          label="Fecha de registro"
          name="fechaRegistro"
          rules={[{ required: true, message: "Selecciona la fecha de registro" }]}
        >
          <DatePicker
            showTime
            format="DD/MM/YYYY HH:mm"
            className="w-full"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
