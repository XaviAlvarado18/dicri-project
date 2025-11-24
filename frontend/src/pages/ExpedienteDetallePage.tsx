import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/client";
import Layout from "../components/Layout";
import type { Expediente, Indicio } from "../types/models";

export default function ExpedienteDetallePage() {
  const { id } = useParams<{ id: string }>();
  const [expediente, setExpediente] = useState<Expediente | null>(null);
  const [indicios, setIndicios] = useState<Indicio[]>([]);
  const [justificacion, setJustificacion] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const cargar = async () => {
    if (!id) return;
    setLoading(true);
    const resExp = await api.get<Expediente>(`/expedientes/${id}`);
    setExpediente(resExp.data);

    const resInd = await api.get<Indicio[]>("/indicios", {
      params: { idExpediente: id }
    });
    setIndicios(resInd.data);
    setLoading(false);
  };

  useEffect(() => {
    void cargar();
  }, [id]);

  const aprobar = async () => {
    if (!id) return;
    await api.post(`/expedientes/${id}/aprobar`);
    await cargar();
  };

  const rechazar = async () => {
    if (!id) return;
    await api.post(`/expedientes/${id}/rechazar`, { justificacion });
    setJustificacion("");
    await cargar();
  };

  if (loading) {
    return (
      <Layout>
        <p>Cargando...</p>
      </Layout>
    );
  }

  if (!expediente) {
    return (
      <Layout>
        <p>No se encontró el expediente</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <button onClick={() => navigate(-1)}>← Volver</button>
      <h2>Expediente #{expediente.NumeroExpediente}</h2>
      <p>Estado: {expediente.CodigoEstado}</p>
      {expediente.JustificacionRechazo && (
        <p>Justificación rechazo: {expediente.JustificacionRechazo}</p>
      )}

      <h3>Indicios</h3>
      {indicios.length === 0 && <p>No hay indicios registrados.</p>}
      <ul>
        {indicios.map((i) => (
          <li key={i.IdIndicio}>
            <strong>{i.Descripcion}</strong> – {i.Color} – {i.Ubicacion}
          </li>
        ))}
      </ul>

      <div style={{ marginTop: 20 }}>
        <h3>Acciones de coordinación</h3>
        <button onClick={aprobar} style={{ marginRight: 10 }}>
          Aprobar
        </button>
        <div style={{ marginTop: 10 }}>
          <textarea
            placeholder="Justificación de rechazo"
            value={justificacion}
            onChange={(e) => setJustificacion(e.target.value)}
            rows={3}
            style={{ width: "100%", marginBottom: 10 }}
          />
          <button onClick={rechazar}>Rechazar</button>
        </div>
      </div>
    </Layout>
  );
}
