import express from "express";
import { R_usuarios } from "./routes/R_usuarios.js";
import { R_publicaciones } from "./routes/R_publicaciones.js";
import { corsMiddleware } from "./middlewares/cors.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger.js";
import logger from "morgan";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(corsMiddleware());

app.use("/api_prueba", express.static(path.join(__dirname, "../web")));

app.use("/api_prueba/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api_prueba/usuarios", R_usuarios());
app.use("/api_prueba/publicaciones", R_publicaciones());

app.get("/api_prueba", (req, res) => {
  res.sendFile(path.join(__dirname, "./web/index.html"));
});

const PORT = process.env.PORT || 2000;
app
  .listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    console.log(`API disponible en http://localhost:${PORT}/api_prueba`);
    console.log(
      `Documentación API disponible en http://localhost:${PORT}/api_prueba/swagger`
    );
  })
  .on("error", (err) => {
    console.error("Error al iniciar el servidor:", err.message);
  });
