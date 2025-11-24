import "dotenv/config"; // Aseguramos que dotenv cargue aquí también
import sql from "mssql";

// Definimos la configuración PERO no la ejecutamos todavía
const getDbConfig = () => ({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER || 'localhost', 
  port: Number(process.env.DB_PORT) || 1433,
  database: process.env.DB_NAME,
  options: {
    encrypt: false, // Desactiva encriptación para localhost/desarrollo
    trustServerCertificate: true, // Acepta certificados auto-firmados (crucial para local)
  },
});

export const getConnection = async () => {
  try {
    const config = getDbConfig();
    
    // DEBUG: Verificamos qué está leyendo Node (No mostrará la contraseña por seguridad)
    console.log("🔌 Intentando conectar a:", { 
        server: config.server, 
        user: config.user, 
        db: config.database 
    });

    // Validamos que existan las credenciales antes de intentar conectar
    if (!config.user || !config.password) {
        throw new Error("❌ Las variables de entorno DB_USER o DB_PASSWORD están vacías.");
    }

    const pool = await sql.connect(config);
    return pool;
  } catch (error) {
    console.error("❌ Error al conectar a la Base de Datos:", error);
    throw error;
  }
};

export { sql };

