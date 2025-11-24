import { Router } from "express";
import {
  aprobarExpediente,
  crearExpediente,
  enviarRevision,
  listarExpedientes,
  obtenerExpediente,
  obtenerExpedienteDetalle,
  rechazarExpediente,
} from "../controllers/expedientes.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", authMiddleware(["TECNICO", "ADMIN"]), crearExpediente);
router.get("/", authMiddleware(["TECNICO", "COORDINADOR", "ADMIN"]), listarExpedientes);
router.get("/:id", authMiddleware(["TECNICO", "COORDINADOR", "ADMIN"]), obtenerExpediente);
router.post("/:id/enviar-revision", authMiddleware(["TECNICO"]), enviarRevision);

// 🔹 Nueva ruta para la pantalla "Revisión de Expediente"
router.get(
  "/:id/detalle",
  authMiddleware(["TECNICO", "COORDINADOR", "ADMIN"]),
  obtenerExpedienteDetalle
);

router.post("/:id/aprobar", authMiddleware(["COORDINADOR", "ADMIN"]), aprobarExpediente);
router.post("/:id/rechazar", authMiddleware(["COORDINADOR", "ADMIN"]), rechazarExpediente);

export default router;
