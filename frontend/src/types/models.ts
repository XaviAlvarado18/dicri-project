export interface Expediente {
  IdExpediente: number;
  NumeroExpediente: string;
  FechaRegistro: string;
  EstadoCodigo?: string;
  NombreEstado?: string;
  JustificacionRechazo?: string | null;
}

export interface Indicio {
  IdIndicio: number;
  IdExpediente: number;
  Descripcion: string;
  Color: string | null;
  Tamano: string | null;
  Peso: string | null;
  Ubicacion: string | null;
}

export interface Filtros {
  estado: string;
  fechaInicio: string;
  fechaFin: string;
}

export interface EvidenciaDetalle {
  IdEvidence: number;
  IdFile: number;
  Description: string;
  Color: string;
  Size: string;
  Weight: string;
  Location: string;
  RegistrationDate: string;
  IdTecnicoEvidencia: number;
  NombreTecnicoEvidencia: string;
  UsuarioTecnicoEvidencia: string;
}

export interface ExpedienteDetalle {
  IdExpediente: number;
  NumeroExpediente: string;
  FechaRegistro: string;
  IdTecnicoRegistro: number;
  NombreTecnicoRegistro: string;
  UsuarioTecnicoRegistro: string;
  IdStatus: number;
  EstadoNombre: string;
  EstadoCodigo: string;
  JustificacionRechazo: string | null;
  Evidencias: EvidenciaDetalle[];
}
