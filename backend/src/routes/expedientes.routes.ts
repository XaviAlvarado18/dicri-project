import { Router } from "express";
import {
    aprobarExpediente,
    crearExpediente,
    enviarRevision,
    listarExpedientes,
    obtenerExpediente,
    rechazarExpediente
} from "../controllers/expedientes.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", authMiddleware(["TECNICO"]), crearExpediente);
router.get("/", authMiddleware(["TECNICO", "COORDINADOR", "ADMIN"]), listarExpedientes);
router.get("/:id", authMiddleware(["TECNICO", "COORDINADOR", "ADMIN"]), obtenerExpediente);
router.post("/:id/enviar-revision", authMiddleware(["TECNICO"]), enviarRevision);
router.post("/:id/aprobar", authMiddleware(["COORDINADOR"]), aprobarExpediente);
router.post("/:id/rechazar", authMiddleware(["COORDINADOR"]), rechazarExpediente);

export default router;
