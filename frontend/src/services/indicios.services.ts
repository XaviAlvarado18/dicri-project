// src/services/indicios.services.ts
import api from "../api/client";

export interface CrearIndicioPayload {
  idExpediente: number;
  descripcion: string;
  color?: string;
  tamano?: string;
  peso?: string;
  ubicacion?: string;
}

export async function crearIndicioService(payload: CrearIndicioPayload) {
  const res = await api.post("/indicios", payload);
  return res.data; // no lo necesitamos para la UI, pero lo dejamos por si acaso
}
