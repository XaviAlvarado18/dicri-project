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

/**
 * @openapi
 * /api/expedientes:
 *   post:
 *     summary: Crear un nuevo expediente
 *     tags:
 *       - Expedientes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               numeroExpediente:
 *                 type: string
 *                 example: "EXP-2025-004"
 *               fechaRegistro:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-11-24T03:19:21.997Z"
 *             required:
 *               - numeroExpediente
 *               - fechaRegistro
 *     responses:
 *       201:
 *         description: Expediente creado correctamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: Usuario no autenticado
 *       403:
 *         description: No tiene permisos
 */

router.post("/", authMiddleware(["TECNICO", "ADMIN"]), crearExpediente);


/**
 * @openapi
 * /api/expedientes:
 *   get:
 *     summary: Listar expedientes
 *     tags:
 *       - Expedientes
 *     parameters:
 *       - in: query
 *         name: estado
 *         schema:
 *           type: string
 *         description: Filtrar por estado
 *     responses:
 *       200:
 *         description: Lista de expedientes
 */

router.get("/", authMiddleware(["TECNICO", "COORDINADOR", "ADMIN"]), listarExpedientes);

/**
 * @openapi
 * /api/expedientes/{id}:
 *   get:
 *     summary: Obtener un expediente por ID
 *     tags:
 *       - Expedientes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico del expediente
 *     responses:
 *       200:
 *         description: Expediente encontrado
 *       401:
 *         description: Usuario no autenticado
 *       403:
 *         description: No tiene permisos
 *       404:
 *         description: Expediente no encontrado
 */

router.get("/:id", authMiddleware(["TECNICO", "COORDINADOR", "ADMIN"]), obtenerExpediente);

/**
 * @openapi
 * /api/expedientes/{id}/enviar-revision:
 *   post:
 *     summary: Enviar expediente a revisión
 *     tags:
 *       - Expedientes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del expediente
 *     responses:
 *       200:
 *         description: Expediente enviado a revisión
 *       401:
 *         description: Usuario no autenticado
 *       403:
 *         description: No tiene permisos
 *       404:
 *         description: Expediente no encontrado
 */
router.post("/:id/enviar-revision", authMiddleware(["TECNICO"]), enviarRevision);

/**
 * @openapi
 * /api/expedientes/{id}/detalle:
 *   get:
 *     summary: Obtener detalle completo de un expediente
 *     description: Devuelve los datos del expediente y los indicios/evidencias asociados.
 *     tags:
 *       - Expedientes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del expediente
 *     responses:
 *       200:
 *         description: Detalle del expediente
 *       401:
 *         description: Usuario no autenticado
 *       403:
 *         description: No tiene permisos
 *       404:
 *         description: Expediente no encontrado
 */
router.get(
  "/:id/detalle",
  authMiddleware(["TECNICO", "COORDINADOR", "ADMIN"]),
  obtenerExpedienteDetalle
);

/**
 * @openapi
 * /api/expedientes/{id}/aprobar:
 *   post:
 *     summary: Aprobar expediente
 *     tags:
 *       - Expedientes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del expediente a aprobar
 *     responses:
 *       200:
 *         description: Expediente aprobado correctamente
 *       401:
 *         description: Usuario no autenticado
 *       403:
 *         description: No tiene permisos
 *       404:
 *         description: Expediente no encontrado
 */
router.post("/:id/aprobar", authMiddleware(["COORDINADOR", "ADMIN"]), aprobarExpediente);

/**
 * @openapi
 * /api/expedientes/{id}/rechazar:
 *   post:
 *     summary: Rechazar expediente
 *     tags:
 *       - Expedientes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del expediente a rechazar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               justificacion:
 *                 type: string
 *                 description: Motivo del rechazo
 *             required:
 *               - justificacion
 *     responses:
 *       200:
 *         description: Expediente rechazado correctamente
 *       400:
 *         description: La justificación es obligatoria
 *       401:
 *         description: Usuario no autenticado
 *       403:
 *         description: No tiene permisos
 *       404:
 *         description: Expediente no encontrado
 */
router.post("/:id/rechazar", authMiddleware(["COORDINADOR", "ADMIN"]), rechazarExpediente);

export default router;
