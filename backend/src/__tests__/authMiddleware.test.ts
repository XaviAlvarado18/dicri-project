import jwt from "jsonwebtoken";
import { authMiddleware } from "../middlewares/auth.middleware";
import { mockNext, mockReq, mockRes } from "./testUtils";

describe("authMiddleware", () => {
  const OLD_ENV = process.env;

  beforeAll(() => {
    process.env = { ...OLD_ENV, JWT_SECRET: "test-secret" };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it("retorna 401 si no hay token", () => {
    const req = mockReq({ headers: {} as any });
    const res = mockRes();
    const next = mockNext();

    authMiddleware(["TECNICO"])(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Token no proporcionado" });
    expect(next).not.toHaveBeenCalled();
  });

  it("retorna 403 si el rol no está permitido", () => {
    const token = jwt.sign(
      { idUsuario: 1, rol: "COORDINADOR" },
      process.env.JWT_SECRET as string
    );

    const req = mockReq({
      headers: { authorization: `Bearer ${token}` } as any,
    });
    const res = mockRes();
    const next = mockNext();

    authMiddleware(["TECNICO"])(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: "No tiene permisos" });
    expect(next).not.toHaveBeenCalled();
  });

  it("deja pasar con token válido y rol permitido", () => {
    const token = jwt.sign(
      { idUsuario: 1, rol: "TECNICO" },
      process.env.JWT_SECRET as string
    );

    const req = mockReq({
      headers: { authorization: `Bearer ${token}` } as any,
    });
    const res = mockRes();
    const next = mockNext();

    authMiddleware(["TECNICO"])(req, res, next);

    expect((req as any).user).toEqual({ idUsuario: 1, rol: "TECNICO" });
    expect(next).toHaveBeenCalled();
  });
});
