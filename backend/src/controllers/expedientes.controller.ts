import type { NextFunction, Request, Response } from "express";
import {
    repoCambiarEstadoExpediente,
    repoCrearExpediente,
    repoListarExpedientes,
    repoObtenerExpediente
} from "../repositories/expedientes.repo.js";

export const crearExpediente = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { numeroExpediente, fechaRegistro } = req.body as {
      numeroExpediente: string;
      fechaRegistro: string;
    };

    const idTecnico = req.user?.idUsuario;
    if (!idTecnico) {
      res.status(401).json({ message: "Usuario no autenticado" });
      return;
    }

    const expediente = await repoCrearExpediente({
      numeroExpediente,
      fechaRegistro,
      idTecnico
    });

    res.status(201).json(expediente);
  } catch (error) {
    next(error);
  }
};

export const listarExpedientes = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { estado, fechaInicio, fechaFin } = req.query as {
      estado?: string;
      fechaInicio?: string;
      fechaFin?: string;
    };
    const expedientes = await repoListarExpedientes({ estado, fechaInicio, fechaFin });
    res.json(expedientes);
  } catch (error) {
    next(error);
  }
};

export const obtenerExpediente = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const expediente = await repoObtenerExpediente(Number(id));
    if (!expediente) {
      res.status(404).json({ message: "Expediente no encontrado" });
      return;
    }
    res.json(expediente);
  } catch (error) {
    next(error);
  }
};

export const enviarRevision = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const usuario = req.user?.idUsuario;
    if (!usuario) {
      res.status(401).json({ message: "Usuario no autenticado" });
      return;
    }
    const actualizado = await repoCambiarEstadoExpediente(
      Number(id),
      "EN_REVISION",
      usuario,
      null
    );
    res.json(actualizado);
  } catch (error) {
    next(error);
  }
};

export const aprobarExpediente = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const usuario = req.user?.idUsuario;
    if (!usuario) {
      res.status(401).json({ message: "Usuario no autenticado" });
      return;
    }
    const actualizado = await repoCambiarEstadoExpediente(
      Number(id),
      "APROBADO",
      usuario,
      null
    );
    res.json(actualizado);
  } catch (error) {
    next(error);
  }
};

export const rechazarExpediente = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { justificacion } = req.body as { justificacion?: string };
    const usuario = req.user?.idUsuario;

    if (!usuario) {
      res.status(401).json({ message: "Usuario no autenticado" });
      return;
    }

    if (!justificacion) {
      res.status(400).json({ message: "La justificación es obligatoria" });
      return;
    }

    const actualizado = await repoCambiarEstadoExpediente(
      Number(id),
      "RECHAZADO",
      usuario,
      justificacion
    );
    res.json(actualizado);
  } catch (error) {
    next(error);
  }
};
