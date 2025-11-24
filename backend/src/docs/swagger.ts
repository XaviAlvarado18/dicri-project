// src/config/swagger.ts
import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API DICRI Evidencias",
      version: "1.0.0",
      description: "API para gestión de evidencias DICRI",
    },
    servers: [
      {
        url: "http://localhost:3000/api",
      },
    ],
  },
  apis: ["./src/routes/*.ts"] // OJO AQUÍ
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
