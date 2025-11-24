// src/services/auth.service.ts
import api from "../api/client";

export interface LoginPayload {
  username: string;
  password: string;
}

export interface UsuarioAuth {
  idUsuario: number;
  nombre: string;
  rol: string; // "ADMIN" | "TECNICO" | "COORDINADOR" | ...
}

export interface LoginResponse {
  token: string;
  usuario: UsuarioAuth;
}

export async function loginService(
  payload: LoginPayload
): Promise<LoginResponse> {
  const res = await api.post<LoginResponse>("/auth/login", payload);
  return res.data;
}
