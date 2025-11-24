import { Router } from "express";
import {
    crearIndicio,
    listarIndiciosPorExpediente
} from "../controllers/indicios.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", authMiddleware(["TECNICO"]), crearIndicio);
router.get("/", authMiddleware(["TECNICO", "COORDINADOR", "ADMIN"]), listarIndiciosPorExpediente);

export default router;
