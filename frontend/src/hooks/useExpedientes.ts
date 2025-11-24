// src/hooks/useExpedientes.ts
import { useCallback, useEffect, useState } from "react";
import {
    listarExpedientesService,
    type FiltrosExpedientes,
} from "../services/expedientes.services";
import type { Expediente } from "../types/models";

export function useExpedientes(initialFilters: FiltrosExpedientes = {}) {
  const [expedientes, setExpedientes] = useState<Expediente[]>([]);
  const [filtros, setFiltros] = useState<FiltrosExpedientes>(initialFilters);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const cargar = useCallback(
    async (overrideFilters?: FiltrosExpedientes) => {
      try {
        setLoading(true);
        setError(null);
        const filtrosFinales = { ...filtros, ...overrideFilters };
        const data = await listarExpedientesService(filtrosFinales);
        setExpedientes(data);
        setFiltros(filtrosFinales);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    [filtros]
  );

  useEffect(() => {
    void cargar();
  }, []); // solo primera carga

  return {
    expedientes,
    filtros,
    setFiltros,
    loading,
    error,
    recargar: cargar,
  };
}
