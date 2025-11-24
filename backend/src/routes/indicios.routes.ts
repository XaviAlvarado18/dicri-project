import { Router } from "express";
import {
    crearIndicio,
    listarIndiciosPorExpediente
} from "../controllers/indicios.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

/**
 * @openapi
 * /api/indicios:
 *   post:
 *     summary: Crear un nuevo indicio/evidencia
 *     tags:
 *       - Indicios
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idExpediente:
 *                 type: integer
 *                 example: 1
 *               descripcion:
 *                 type: string
 *                 example: "Small red fiber found under the door."
 *               color:
 *                 type: string
 *                 example: "Red"
 *               tamano:
 *                 type: string
 *                 example: "2 cm"
 *               peso:
 *                 type: string
 *                 example: "0.1g"
 *               ubicacion:
 *                 type: string
 *                 example: "Victim apartment, living room"
 *             required:
 *               - idExpediente
 *               - descripcion
 *     responses:
 *       201:
 *         description: Indicio creado correctamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: Usuario no autenticado
 *       403:
 *         description: No tiene permisos
 */
router.post("/", authMiddleware(["TECNICO", "ADMIN"]), crearIndicio);

/**
 * @openapi
 * /api/indicios:
 *   get:
 *     summary: Listar indicios por expediente
 *     tags:
 *       - Indicios
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: idExpediente
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del expediente al que pertenecen los indicios
 *     responses:
 *       200:
 *         description: Lista de indicios del expediente
 *       400:
 *         description: idExpediente es requerido
 *       401:
 *         description: Usuario no autenticado
 *       403:
 *         description: No tiene permisos
 */
router.get("/", authMiddleware(["TECNICO", "COORDINADOR", "ADMIN"]), listarIndiciosPorExpediente);

export default router;
