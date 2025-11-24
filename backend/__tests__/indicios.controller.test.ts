import { crearIndicio } from "../controllers/indicios.controller";
import { repoCrearIndicio } from "../repositories/indicios.repo";
import { mockNext, mockReq, mockRes } from "./testUtils";

jest.mock("../repositories/indicios.repo");

describe("indicios.controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("crearIndicio retorna 401 si no hay usuario", async () => {
    const req = mockReq({
      body: {
        idExpediente: 1,
        descripcion: "Prueba",
      },
      user: undefined as any,
    });
    const res = mockRes();
    const next = mockNext();

    await crearIndicio(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Usuario no autenticado",
    });
  });

  it("crearIndicio llama al repo con los datos correctos", async () => {
    (repoCrearIndicio as jest.Mock).mockResolvedValue({
      IdEvidence: 1,
      Description: "Prueba",
    });

    const req = mockReq({
      body: {
        idExpediente: 3,
        descripcion: "Prueba",
        color: "Rojo",
        tamano: "Grande",
        peso: "350g",
        ubicacion: "Sala",
      },
      user: { idUsuario: 2, rol: "TECNICO" } as any,
    });
    const res = mockRes();
    const next = mockNext();

    await crearIndicio(req, res, next);

    expect(repoCrearIndicio).toHaveBeenCalledWith({
      idExpediente: 3,
      descripcion: "Prueba",
      color: "Rojo",
      tamano: "Grande",
      peso: "350g",
      ubicacion: "Sala",
      idTecnicoRegistro: 2,
    });

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      IdEvidence: 1,
      Description: "Prueba",
    });
  });
});
