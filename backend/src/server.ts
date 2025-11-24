import cors from "cors";
import "dotenv/config";
import express, { type NextFunction, type Request, type Response } from "express";

import swaggerUi from "swagger-ui-express";
import { getConnection } from "./config/db.js";
import { swaggerSpec } from "./docs/swagger.js";
import authRoutes from "./routes/auth.routes.js";
import expedientesRoutes from "./routes/expedientes.routes.js";
import indiciosRoutes from "./routes/indicios.routes.js";

export const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Healthcheck
app.get("/api/health", async (_req: Request, res: Response) => {
  try {
    await getConnection();
    res.json({ status: "ok" });
  } catch {
    res.status(500).json({ status: "error" });
  }
});

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/expedientes", expedientesRoutes);
app.use("/api/indicios", indiciosRoutes);

// Swagger
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/api/docs-json", (_req, res) => {
  res.json(swaggerSpec);
});


// Manejo de errores básico
app.use(
  (err: unknown, _req: Request, res: Response, _next: NextFunction): void => {
    console.error(err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
);

app.listen(port, () => {
  console.log(`🚀 Backend escuchando en http://localhost:${port}`);
  console.log(`📚 Swagger UI en http://localhost:${port}/api/docs`);
});

export default app;
