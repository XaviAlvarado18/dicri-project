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
