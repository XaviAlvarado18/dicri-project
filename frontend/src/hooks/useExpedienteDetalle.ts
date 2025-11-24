// src/hooks/useExpedienteDetalle.ts
import { useEffect, useState } from "react";
import { obtenerExpedienteDetalleService } from "../services/expedientes.services";
import type { ExpedienteDetalle } from "../types/models";

export function useExpedienteDetalle(id?: number) {
  const [data, setData] = useState<ExpedienteDetalle | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const detalle = await obtenerExpedienteDetalleService(id);
        setData(detalle);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    void fetchData();
  }, [id]);

  return { data, loading, error };
}
