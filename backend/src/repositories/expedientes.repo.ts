import { getConnection, sql } from "../config/db.js";
import type { EvidenciaDetalle, Expediente, ExpedienteDetalle } from "../types/models.js";

interface ListarExpedientesFiltro {
  estado?: string;
  fechaInicio?: string;
  fechaFin?: string;
}

interface CrearExpedienteProps {
  numeroExpediente: string;
  fechaRegistro: string;
  idTecnico: number;
}

export const repoCrearExpediente = async ({
  numeroExpediente,
  fechaRegistro,
  idTecnico
}: CrearExpedienteProps): Promise<Expediente> => {
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("NumeroExpediente", sql.VarChar(50), numeroExpediente)
    .input("FechaRegistro", sql.DateTime, new Date(fechaRegistro))
    .input("IdTecnicoRegistro", sql.Int, idTecnico)
    .execute("sp_Expediente_Insert");

  return result.recordset[0] as Expediente;
};

export const repoListarExpedientes = async ({
  estado,
  fechaInicio,
  fechaFin
}: ListarExpedientesFiltro): Promise<Expediente[]> => {
  const pool = await getConnection();
  const request = pool.request();

  request.input("Estado", sql.VarChar(20), estado || null);
  request.input(
    "FechaInicio",
    sql.DateTime,
    fechaInicio ? new Date(fechaInicio) : null
  );
  request.input(
    "FechaFin",
    sql.DateTime,
    fechaFin ? new Date(fechaFin) : null
  );

  const result = await request.execute("sp_Expediente_List");
  return result.recordset as Expediente[];
};

export const repoObtenerExpediente = async (
  idExpediente: number
): Promise<Expediente | undefined> => {
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("IdExpediente", sql.Int, idExpediente)
    .execute("sp_Expediente_GetById");

  return result.recordset[0] as Expediente | undefined;
};

export const repoCambiarEstadoExpediente = async (
  idExpediente: number,
  nuevoEstado: string,
  idUsuario: number,
  justificacion: string | null
): Promise<Expediente> => {
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("IdExpediente", sql.Int, idExpediente)
    .input("NuevoEstado", sql.VarChar(20), nuevoEstado)
    .input("IdUsuario", sql.Int, idUsuario)
    .input("Justificacion", sql.NVarChar(500), justificacion)
    .execute("sp_Expediente_CambiarEstado");

  return result.recordset[0] as Expediente;
};


/** Obtiene expediente + lista de evidencias */
export const repoObtenerExpedienteDetalle = async (
  idExpediente: number
): Promise<ExpedienteDetalle | undefined> => {
  const pool = await getConnection();

  const result = await pool
    .request()
    .input("IdFile", sql.Int, idExpediente)
    // Si hiciste el SP:
    .execute("sp_Expediente_GetDetalle");
    // Si prefieres query directa:
    // .query(`... SQL de arriba ...`);

  const rs: any = result;

  const expedienteRow = rs.recordsets?.[0]?.[0];


  if (!expedienteRow) return undefined;

  const evidenciasRows = (rs.recordsets?.[1] ?? []) as EvidenciaDetalle[];

  const detalle: ExpedienteDetalle = {
    ...expedienteRow,
    Evidencias: evidenciasRows,
  };

  return detalle;
};
