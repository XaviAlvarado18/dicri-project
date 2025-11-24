// src/pages/ExpedienteDetallePage.tsx
import {
  Button,
  Card,
  Descriptions,
  Drawer,
  Input,
  message,
  Spin,
  Table,
  Tag,
  Typography
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Layout from "../components/Layout";
import { useExpedienteDetalle } from "../hooks/useExpedienteDetalle";
import {
  aprobarExpedienteService,
  rechazarExpedienteService,
} from "../services/expedientes.services";
import type { EvidenciaDetalle, ExpedienteDetalle } from "../types/models";

const { Title, Text } = Typography;
const { TextArea } = Input;

export default function ExpedienteDetallePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const expedienteId = id ? Number(id) : undefined;

  const { data: expediente, loading, error, recargar } =
    useExpedienteDetalle(expedienteId);

  const [justificacion, setJustificacion] = useState("");
  const [accionLoading, setAccionLoading] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);

  const handleAprobar = async () => {
    if (!expedienteId) return;
    try {
      setAccionLoading(true);
      await aprobarExpedienteService(expedienteId);
      message.success("Expediente aprobado correctamente");
      await recargar();
    } catch (err: any) {
      message.error(
        err?.response?.data?.message ??
          "Ocurrió un error al aprobar el expediente"
      );
    } finally {
      setAccionLoading(false);
    }
  };

  const handleClickRechazar = () => {
    setRejectOpen(true);
  };

  const handleConfirmRechazo = async () => {
    if (!justificacion.trim()) {
      message.warning("Debes ingresar una justificación para el rechazo");
      return;
    }

    try {
      setAccionLoading(true);
      await rechazarExpedienteService(expedienteId, justificacion.trim());
      message.success("Expediente rechazado correctamente");
      setJustificacion("");
      setRejectOpen(false);
      await recargar(); // refrescar detalle
    } catch (err: any) {
      message.error(
        err?.response?.data?.message ??
          "Ocurrió un error al rechazar el expediente"
      );
    } finally {
      setAccionLoading(false);
    }
  };

  // Columnas de la tabla de evidencias/indicios
  const columns: ColumnsType<EvidenciaDetalle> = [
    {
      title: "ID",
      dataIndex: "IdEvidence",
      key: "IdEvidence",
      width: 80,
    },
    {
      title: "Descripción",
      dataIndex: "Description",
      key: "Description",
    },
    {
      title: "Color",
      dataIndex: "Color",
      key: "Color",
      width: 120,
    },
    {
      title: "Tamaño",
      dataIndex: "Size",
      key: "Size",
      width: 120,
    },
    {
      title: "Peso",
      dataIndex: "Weight",
      key: "Weight",
      width: 120,
    },
    {
      title: "Ubicación",
      dataIndex: "Location",
      key: "Location",
      width: 180,
    },
    {
      title: "Técnico",
      dataIndex: "NombreTecnicoEvidencia",
      key: "NombreTecnicoEvidencia",
      width: 200,
    },
  ];

  const renderEstadoTag = (exp: ExpedienteDetalle) => {
    const codigo = exp.EstadoCodigo; // p.ej. REG, PROC, FINAL, REJ
    let color: string = "default";
    let label = codigo;

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
  };

  if (loading && !expediente) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Spin size="large" />
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="px-4 md:px-8 lg:px-16 py-6">
          <p className="text-red-600">
            Ocurrió un error al cargar el expediente.
          </p>
        </div>
      </Layout>
    );
  }

  if (!expediente) {
    return (
      <Layout>
        <div className="px-4 md:px-8 lg:px-16 py-6">
          <p>No se encontró el expediente.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="px-4 md:px-8 lg:px-16 py-6 bg-[#D5DCE2] min-h-screen">
        <div className="max-w-6xl mx-auto space-y-4">
          {/* Botón volver */}
          <button
            onClick={() => navigate(-1)}
            className="mb-2 text-sm text-[#1B375C] hover:underline"
          >
            ← Volver
          </button>

          {/* Título principal */}
          <Title
            level={3}
            className="!mb-4 !text-2xl !font-semibold text-gray-800"
          >
            Expediente #{expediente.NumeroExpediente}
          </Title>

          {/* Datos del expediente */}
          <Card
            bordered={false}
            className="shadow-sm rounded-xl bg-white"
            bodyStyle={{ padding: "1.25rem 1.5rem" }}
          >
            <h3 className="text-base font-semibold text-gray-700 mb-3">
              Datos del Expediente
            </h3>

            <Descriptions
              bordered={false}
              column={2}
              size="small"
              labelStyle={{ fontWeight: 600, width: 200 }}
            >
              <Descriptions.Item label="Número de Expediente">
                {expediente.NumeroExpediente}
              </Descriptions.Item>
              <Descriptions.Item label="Fecha de Registro">
                {new Date(expediente.FechaRegistro).toLocaleString("es-GT", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Descriptions.Item>
              <Descriptions.Item label="Técnico Registrador">
                {expediente.NombreTecnicoRegistro}
              </Descriptions.Item>
              <Descriptions.Item label="Estado">
                {renderEstadoTag(expediente)}
              </Descriptions.Item>
              {expediente.JustificacionRechazo && (
                <Descriptions.Item label="Justificación de rechazo">
                  {expediente.JustificacionRechazo}
                </Descriptions.Item>
              )}
            </Descriptions>
          </Card>

          {/* Indicios / Evidencias */}
          <Card
            bordered={false}
            className="shadow-sm rounded-xl overflow-hidden"
            bodyStyle={{ padding: 0 }}
          >
            <div className="px-6 py-3 bg-[#1B375C]">
              <h3 className="text-white font-semibold">
                Indicios registrados en el expediente
              </h3>
            </div>

            <div className="p-4">
              <Table
                rowKey="IdEvidence"
                columns={columns}
                dataSource={expediente.Evidencias ?? []}
                pagination={false}
                size="small"
              />

              {(!expediente.Evidencias ||
                expediente.Evidencias.length === 0) && (
                <p className="text-center text-gray-500 py-4">
                  No hay indicios registrados en este expediente.
                </p>
              )}
            </div>
          </Card>

          {/* Revisión y aprobación */}
          <Card
            bordered={false}
            className="shadow-sm rounded-xl overflow-hidden"
            bodyStyle={{ padding: 0 }}
          >
            <div className="px-6 py-3 bg-[#3177B3]">
              <h3 className="text-base font-semibold text-white">
                Revisión y Aprobación
              </h3>
            </div>

            <div className="flex flex-col md:flex-row gap-4 md:items-center mb-4 px-6 py-3">
              <div>
                <Text className="block text-sm text-gray-600 mb-1">
                  Estado actual:
                </Text>
                {renderEstadoTag(expediente)}
              </div>
            </div>

            
              <div className="flex md:flex-row gap-2 md:items-stretch py-4 px-6">

                <Button
                  danger
                  onClick={handleClickRechazar}
                  loading={accionLoading}
                  className="font-semibold w-full"
                  disabled={expediente.EstadoCodigo === "REJ"}
                >
                  Rechazar
                </Button>
                <Button
                  type="primary"
                  onClick={handleAprobar}
                  loading={accionLoading}
                  className="bg-green-600 border-none font-semibold w-full"
                  disabled={expediente.EstadoCodigo === "FINAL"}
                >
                  Aprobar
                </Button>
              </div>
              
              <Drawer
                open={rejectOpen}
                placement="bottom"
                mask={false}
                size={220}
                closable={false}
                onClose={() => setRejectOpen(false)}
                bodyStyle={{ padding: "16px 24px" }}
                className="rounded-t-2xl shadow-[0_-4px_10px_rgba(0,0,0,0.15)]"
              >
                <div className="flex flex-col h-full">
                  <h3 className="text-base font-semibold text-gray-800 mb-2">
                    Rechazar expediente #{expediente?.NumeroExpediente}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Indique la justificación por la cual rechaza el expediente:
                  </p>

                  <TextArea
                    rows={3}
                    value={justificacion}
                    onChange={(e) => setJustificacion(e.target.value)}
                    placeholder="Detalle aquí el motivo del rechazo..."
                    className="mb-3"
                  />

                  <div className="mt-auto flex gap-2 justify-end">
                    <Button onClick={() => setRejectOpen(false)}>Cancelar</Button>
                    <Button
                      danger
                      type="primary"
                      loading={accionLoading}
                      onClick={handleConfirmRechazo}
                    >
                      Rechazar
                    </Button>
                  </div>
                </div>
              </Drawer>

          </Card>
        </div>
      </div>
    </Layout>
  );
}
