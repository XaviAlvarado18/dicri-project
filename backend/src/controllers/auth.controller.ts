import bcrypt from "bcryptjs";
import type { NextFunction, Request, Response } from "express";
import jwt, { type Secret, type SignOptions } from "jsonwebtoken";
import { getConnection, sql } from "../config/db.js";
import type { UsuarioDB } from "../types/models.js";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { username, password } = req.body as { username: string; password: string };

    const pool = await getConnection();
    const result = await pool
      .request()
      .input("Username", sql.VarChar(50), username)
      .execute("sp_User_Login");
      

    const user = result.recordset[0] as UsuarioDB | undefined;
    if (!user) {
      res.status(401).json({ message: "Usuario o contraseña inválidos" });
      return;
    }

    const passwordValida = await bcrypt.compare(password, user.PasswordHash);
    if (!passwordValida) {
      res.status(401).json({ message: "Usuario o contraseña inválidos" });
      return;
    }

    const secret = process.env.JWT_SECRET as Secret;
    const options: SignOptions = {
      expiresIn: (process.env.JWT_EXPIRES_IN ?? "8h") as unknown as SignOptions["expiresIn"],
    };

    const token = jwt.sign(
      { idUsuario: user.IdUser, rol: user.Role },
      secret,
      options
    );

    res.json({
      token,
      usuario: {
        idUsuario: user.IdUser,
        nombre: user.FullName,
        rol: user.Role
      }
    });
  } catch (error) {
    next(error);
  }
};
