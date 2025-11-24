export interface UsuarioDB {
  IdUser: number;
  Username: string;
  FullName: string;
  PasswordHash: string;
  Role: string;
}

export interface Expediente {
  IdExpediente: number;
  NumeroExpediente: string;
  FechaRegistro: Date;
  IdTecnicoRegistro: number;
  IdEstado: number;
  CodigoEstado?: string;
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
  IdTecnicoRegistro: number;
  FechaRegistro: Date;
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
