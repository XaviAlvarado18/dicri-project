import "express";

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      idUsuario: number;
      rol: string;
    };
  }
}
