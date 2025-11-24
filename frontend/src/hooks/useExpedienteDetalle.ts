// src/hooks/useExpedienteDetalle.ts
import { useCallback, useEffect, useState } from "react";
import { obtenerExpedienteDetalleService } from "../services/expedientes.services";
import type { ExpedienteDetalle } from "../types/models";

export function useExpedienteDetalle(id?: number) {
  const [data, setData] = useState<ExpedienteDetalle | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const fetchData = useCallback(async () => {
    if (!id) return;
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
  }, [id]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  return { data, loading, error, recargar: fetchData };
}
