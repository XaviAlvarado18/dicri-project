// src/services/expedientes.service.ts
import api from "../api/client";
import type { Expediente } from "../types/models"; // ajusta la ruta
// Si ya creaste el tipo de detalle:
import type { ExpedienteDetalle } from "../types/models";

export interface FiltrosExpedientes {
  estado?: string;
  fechaInicio?: string;
  fechaFin?: string;
}

// 🔹 GET /expedientes (lista)
export async function listarExpedientesService(
  filtros: FiltrosExpedientes = {}
): Promise<Expediente[]> {
  const res = await api.get<Expediente[]>("/expedientes", { params: filtros });
  return res.data;
}

// 🔹 GET /expedientes/:id (básico)
export async function obtenerExpedienteService(
  id: number
): Promise<Expediente> {
  const res = await api.get<Expediente>(`/expedientes/${id}`);
  return res.data;
}

// 🔹 GET /expedientes/:id/detalle (para tu pantalla de revisión)
export async function obtenerExpedienteDetalleService(
  id: number
): Promise<ExpedienteDetalle> {
  const res = await api.get<ExpedienteDetalle>(`/expedientes/${id}/detalle`);
  return res.data;
}

// 🔹 POST /expedientes (crear)
export async function crearExpedienteService(payload: {
  numeroExpediente: string;
  fechaRegistro: string;
}) {
  const res = await api.post("/expedientes", payload);
  return res.data;
}

// 🔹 POST /expedientes/:id/enviar-revision
export async function enviarRevisionService(id: number) {
  const res = await api.post(`/expedientes/${id}/enviar-revision`, {});
  return res.data;
}

// 🔹 POST /expedientes/:id/aprobar
export async function aprobarExpedienteService(id: number) {
  const res = await api.post(`/expedientes/${id}/aprobar`, {});
  return res.data;
}

// 🔹 POST /expedientes/:id/rechazar
export async function rechazarExpedienteService(
  id: number,
  justificacion: string
) {
  const res = await api.post(`/expedientes/${id}/rechazar`, {
    justificacion,
  });
  return res.data;
}
