import type { Expediente } from "../types/models";

interface ExpedienteCardProps {
  expediente: Expediente;
  onClick?: () => void;
}

export default function ExpedienteCard({ expediente, onClick }: ExpedienteCardProps) {
  return (
    <div
      onClick={onClick}
      style={{
        border: "1px solid #ccc",
        padding: 10,
        marginBottom: 10,
        cursor: onClick ? "pointer" : "default"
      }}
    >
      <strong>{expediente.NumeroExpediente}</strong>
      <div>Fecha: {new Date(expediente.FechaRegistro).toLocaleString()}</div>
      <div>Estado: {expediente.CodigoEstado}</div>
      {expediente.JustificacionRechazo && (
        <div>Rechazo: {expediente.JustificacionRechazo}</div>
      )}
    </div>
  );
}
