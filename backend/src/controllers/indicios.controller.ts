import type { NextFunction, Request, Response } from "express";
import {
    repoCrearIndicio,
    repoListarIndiciosPorExpediente
} from "../repositories/indicios.repo.js";

export const crearIndicio = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { idExpediente, descripcion, color, tamano, peso, ubicacion } = req.body as {
      idExpediente: number;
      descripcion: string;
      color?: string;
      tamano?: string;
      peso?: string;
      ubicacion?: string;
    };

    const idTecnicoRegistro = req.user?.idUsuario;
    if (!idTecnicoRegistro) {
      res.status(401).json({ message: "Usuario no autenticado" });
      return;
    }

    const indicio = await repoCrearIndicio({
      idExpediente,
      descripcion,
      color,
      tamano,
      peso,
      ubicacion,
      idTecnicoRegistro
    });

    res.status(201).json(indicio);
  } catch (error) {
    next(error);
  }
};

export const listarIndiciosPorExpediente = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { idExpediente } = req.query as { idExpediente?: string };
    if (!idExpediente) {
      res.status(400).json({ message: "idExpediente es requerido" });
      return;
    }

    const indicios = await repoListarIndiciosPorExpediente(Number(idExpediente));
    res.json(indicios);
  } catch (error) {
    next(error);
  }
};
