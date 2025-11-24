import { getConnection, sql } from "../config/db.js";
import type { Indicio } from "../types/models.js";

interface CrearIndicioProps {
  idExpediente: number;
  descripcion: string;
  color?: string;
  tamano?: string;
  peso?: string;
  ubicacion?: string;
  idTecnicoRegistro: number;
}

export const repoCrearIndicio = async (
  data: CrearIndicioProps
): Promise<Indicio> => {
  const {
    idExpediente,
    descripcion,
    color,
    tamano,
    peso,
    ubicacion,
    idTecnicoRegistro
  } = data;

  const pool = await getConnection();
  const result = await pool
    .request()
    .input("IdExpediente", sql.Int, idExpediente)
    .input("Descripcion", sql.NVarChar(500), descripcion)
    .input("Color", sql.NVarChar(100), color || null)
    .input("Tamano", sql.NVarChar(100), tamano || null)
    .input("Peso", sql.NVarChar(100), peso || null)
    .input("Ubicacion", sql.NVarChar(200), ubicacion || null)
    .input("IdTecnicoRegistro", sql.Int, idTecnicoRegistro)
    .execute("sp_Indicio_Insert");

  return result.recordset[0] as Indicio;
};

export const repoListarIndiciosPorExpediente = async (
  idExpediente: number
): Promise<Indicio[]> => {
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("IdExpediente", sql.Int, idExpediente)
    .execute("sp_Indicio_ListByExpediente");

  return result.recordset as Indicio[];
};
