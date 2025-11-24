export interface Expediente {
  IdExpediente: number;
  NumeroExpediente: string;
  FechaRegistro: string;
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
}

export interface Filtros {
  estado: string;
  fechaInicio: string;
  fechaFin: string;
}