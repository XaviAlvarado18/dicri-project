import { Form, Input, message, Modal } from "antd";
import { useState } from "react";
import { crearIndicioService } from "../services/indicios.services";

const { TextArea } = Input;

interface CrearIndicioModalProps {
  open: boolean;
  onClose: () => void;
  onCreated: () => void; // para recargar la info del expediente
  idExpediente: number;
}

export default function CrearIndicioModal({
  open,
  onClose,
  onCreated,
  idExpediente,
}: CrearIndicioModalProps) {
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

      await crearIndicioService({
        idExpediente,
        descripcion: values.descripcion,
        color: values.color || undefined,
        tamano: values.tamano || undefined,
        peso: values.peso || undefined,
        ubicacion: values.ubicacion || undefined,
      });

      message.success("Indicio creado correctamente");
      form.resetFields();
      onCreated(); // recargar datos del expediente (incluye lista de indicios)
      onClose();
    } catch (err: any) {
      if (err?.errorFields) {
        // errores de validación del formulario
        return;
      }
      message.error(
        err?.response?.data?.message ??
          "Ocurrió un error al crear el indicio"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      title="Nuevo indicio"
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={loading}
      okText="Guardar indicio"
      cancelText="Cancelar"
      destroyOnClose
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Descripción"
          name="descripcion"
          rules={[
            { required: true, message: "Ingresa la descripción del indicio" },
            { max: 500, message: "Máximo 500 caracteres" },
          ]}
        >
          <TextArea rows={3} placeholder="Describe brevemente el indicio" />
        </Form.Item>

        <Form.Item label="Color" name="color">
          <Input placeholder="Ej: Rojo, Azul, Transparente..." />
        </Form.Item>

        <Form.Item label="Tamaño" name="tamano">
          <Input placeholder="Ej: Pequeño, 10x5 cm..." />
        </Form.Item>

        <Form.Item label="Peso" name="peso">
          <Input placeholder="Ej: 2 kg, 350 g..." />
        </Form.Item>

        <Form.Item label="Ubicación" name="ubicacion">
          <Input placeholder="Ej: Sala, habitación principal, vehículo..." />
        </Form.Item>
      </Form>
    </Modal>
  );
}
