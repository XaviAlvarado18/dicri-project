import bcrypt from "bcryptjs";
import { getConnection } from "../config/db.js";
import { login } from "../controllers/auth.controller";
import { mockNext, mockReq, mockRes } from "./testUtils";

// 👇 Aquí hacemos un mock más completo
jest.mock("../config/db.js", () => {
  return {
    getConnection: jest.fn(),
    sql: {
      VarChar: jest.fn(() => ({})),   // solo necesita no explotar
      // si quieres, puedes agregar más por si otros sitios lo usan:
      DateTime: jest.fn(() => ({})),
      Int: jest.fn(() => ({})),
      NVarChar: jest.fn(() => ({})),
    },
  };
});

describe("auth.controller login", () => {
  const OLD_ENV = process.env;

  beforeAll(() => {
    process.env = {
      ...OLD_ENV,
      JWT_SECRET: "test-secret",
      JWT_EXPIRES_IN: "1h",
    };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it("retorna 401 si el usuario no existe", async () => {
    (getConnection as jest.Mock).mockResolvedValue({
      request: () => ({
        input: () => ({ execute: async () => ({ recordset: [] }) }),
      }),
    });

    const req = mockReq({
      body: { username: "noexiste", password: "x" },
    });
    const res = mockRes();
    const next = mockNext();

    await login(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Usuario o contraseña inválidos",
    });
  });

  it("retorna token y usuario si credenciales son válidas", async () => {
    const passwordHash = await bcrypt.hash("secreto", 10);

    (getConnection as jest.Mock).mockResolvedValue({
      request: () => ({
        input: () => ({
          execute: async () => ({
            recordset: [
              {
                IdUser: 1,
                Username: "tech_a",
                FullName: "Alice Smith",
                PasswordHash: passwordHash,
                Role: "TECNICO",
              },
            ],
          }),
        }),
      }),
    });

    const req = mockReq({
      body: { username: "tech_a", password: "secreto" },
    });
    const res = mockRes();
    const next = mockNext();

    await login(req, res, next);

    expect(res.json).toHaveBeenCalled();
    const args = (res.json as jest.Mock).mock.calls[0][0];

    expect(args.token).toBeDefined();
    expect(args.usuario).toEqual({
      idUsuario: 1,
      nombre: "Alice Smith",
      rol: "TECNICO",
    });
  });
});
