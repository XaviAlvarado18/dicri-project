import type { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface CustomJwtPayload extends JwtPayload {
  idUsuario: number;
  rol: string;
}

export const authMiddleware = (rolesPermitidos: string[] = []) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      res.status(401).json({ message: "Token no proporcionado" });
      return;
    }

    const token = authHeader.split(" ")[1];

    try {
      const payload = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as CustomJwtPayload;

      req.user = {
        idUsuario: payload.idUsuario,
        rol: payload.rol
      };

      if (rolesPermitidos.length && !rolesPermitidos.includes(payload.rol)) {
        res.status(403).json({ message: "No tiene permisos" });
        return;
      }

      next();
    } catch (_error) {
      res.status(401).json({ message: "Token inválido" });
    }
  };
};
