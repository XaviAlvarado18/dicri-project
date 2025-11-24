import { aprobarExpediente, listarExpedientes, rechazarExpediente } from "../controllers/expedientes.controller";
import { repoCambiarEstadoExpediente, repoListarExpedientes } from "../repositories/expedientes.repo";
import { mockNext, mockReq, mockRes } from "./testUtils";

jest.mock("../repositories/expedientes.repo");

describe("expedientes.controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("listarExpedientes llama al repo con filtros y devuelve JSON", async () => {
    (repoListarExpedientes as jest.Mock).mockResolvedValue([
      { IdExpediente: 1, NumeroExpediente: "EXP-001" },
    ]);

    const req = mockReq({
      query: { estado: "REGISTRADO", fechaInicio: "2025-01-01" } as any,
    });
    const res = mockRes();
    const next = mockNext();

    await listarExpedientes(req, res, next);

    expect(repoListarExpedientes).toHaveBeenCalledWith({
      estado: "REGISTRADO",
      fechaInicio: "2025-01-01",
      fechaFin: undefined,
    });
    expect(res.json).toHaveBeenCalledWith([
      { IdExpediente: 1, NumeroExpediente: "EXP-001" },
    ]);
  });

  it("aprobarExpediente retorna 401 si no hay usuario", async () => {
    const req = mockReq({ params: { id: "1" } as any, user: undefined as any });
    const res = mockRes();
    const next = mockNext();

    await aprobarExpediente(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Usuario no autenticado",
    });
  });

  it("aprobarExpediente llama al repoCambiarEstadoExpediente con APROBADO", async () => {
    (repoCambiarEstadoExpediente as jest.Mock).mockResolvedValue({
      IdExpediente: 1,
      EstadoCodigo: "FINAL",
    });

    const req = mockReq({
      params: { id: "1" } as any,
      user: { idUsuario: 10, rol: "COORDINADOR" } as any,
    });
    const res = mockRes();
    const next = mockNext();

    await aprobarExpediente(req, res, next);

    expect(repoCambiarEstadoExpediente).toHaveBeenCalledWith(
      1,
      "APROBADO",
      10,
      null
    );
    expect(res.json).toHaveBeenCalledWith({
      IdExpediente: 1,
      EstadoCodigo: "FINAL",
    });
  });

  it("rechazarExpediente exige justificación", async () => {
    const req = mockReq({
      params: { id: "1" } as any,
      body: {},
      user: { idUsuario: 10, rol: "COORDINADOR" } as any,
    });
    const res = mockRes();
    const next = mockNext();

    await rechazarExpediente(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "La justificación es obligatoria",
    });
  });
});
