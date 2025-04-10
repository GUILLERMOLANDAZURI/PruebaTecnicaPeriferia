import pg from "pg";
const { Pool } = pg;

export const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "myuser",
  password: process.env.DB_PASSWORD || "mypassword",
  port: parseInt(process.env.DB_PORT) || 5232,
  database: process.env.DB_NAME || "PRUEBA",
});

pool.on("connect", () => {
  console.log("Conexión establecida con la base de datos");
});

pool.on("error", (err) => {
  console.error("Error inesperado en el pool:", err);
  process.exit(-1);
});

export const initializeDB = async () => {
  try {
    await pool.query("SELECT NOW()");
    console.log("Database connected");
  } catch (err) {
    console.error("Database connection error:", err);
    process.exit(1);
  }
};
