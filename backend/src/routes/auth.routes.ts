import { Router } from "express";
import { login } from "../controllers/auth.controller.js";

const router = Router();

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: tech_a
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "MiPassword123!"
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: Login exitoso, devuelve token JWT y datos básicos del usuario
 *       401:
 *         description: Usuario o contraseña inválidos
 */
router.post("/login", login);

export default router;
