import { Router } from "express";
import { C_usuarios } from "../controllers/C_usuarios.js";
import { authMiddleware } from "../middlewares/auth.js";

export const R_usuarios = () => {
  const router = Router();
  const controller = new C_usuarios();

  router.get("/", authMiddleware, controller.getAll);
  router.post("/", controller.create);
  router.post("/login", controller.login);
  router.get("/:id", authMiddleware, controller.getById);
  router.put("/:id/password", authMiddleware, controller.updatePassword);

  return router;
};

/**
 * @swagger
 * /usuarios:
 *   post:
 *     tags: [Usuarios]
 *     summary: Registrar nuevo usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: Datos incompletos o inválidos
 */
/**
 * @swagger
 * /usuarios/login:
 *   post:
 *     tags: [Usuarios]
 *     summary: Iniciar sesión
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token de autenticación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 */

/**
 * @swagger
 * /usuarios/{id}/password:
 *   put:
 *     tags: [Usuarios]
 *     summary: Actualizar contraseña de usuario
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: UUID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 description: Contraseña actual
 *               newPassword:
 *                 type: string
 *                 description: Nueva contraseña
 *             required:
 *               - currentPassword
 *               - newPassword
 *     responses:
 *       200:
 *         description: Contraseña actualizada exitosamente
 *       400:
 *         description: Datos incompletos
 *       401:
 *         description: Contraseña actual incorrecta
 *       404:
 *         description: Usuario no encontrado
 */
