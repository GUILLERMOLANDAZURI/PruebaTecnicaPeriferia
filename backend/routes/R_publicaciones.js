import { Router } from "express";
import { C_publicaciones } from "../controllers/C_publicaciones.js";
import { authMiddleware } from "../middlewares/auth.js";

export const R_publicaciones = () => {
  const router = Router();
  const controller = new C_publicaciones();

  router.post("/list", controller.getAll);
  router.post("/", authMiddleware, controller.create);
  router.post("/:id/likes", authMiddleware, controller.addLike);
  router.delete(
    "/:publicacion_id/likes/:usuario_id",
    authMiddleware,
    controller.removeLike
  );
  /**
   * @swagger
   * /publicaciones/list:
   *   post:
   *     tags: [Publicaciones]
   *     summary: Obtener todas las publicaciones con likes
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required: [usuario_id]
   *             properties:
   *               usuario_id:
   *                 type: string
   *                 format: uuid
   *                 example: "a550f2fa-87be-4cde-85df-d68859e5c76c"
   *     responses:
   *       200:
   *         description: Lista de publicaciones con total de likes
   *       400:
   *         description: usuario_id requerido
   *       500:
   *         description: Error del servidor
   */

  /**
   * @swagger
   * /publicaciones:
   *   post:
   *     tags: [Publicaciones]
   *     summary: Crear publicación
   *     security:
   *       - BearerAuth: []
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required: [usuario_id, contenido]
   *             properties:
   *               usuario_id:
   *                 type: string
   *                 format: uuid
   *               contenido:
   *                 type: string
   *     responses:
   *       201:
   *         description: Publicación creada
   */

  /**
   * @swagger
   * /publicaciones/{id}/likes:
   *   post:
   *     tags: [Publicaciones]
   *     summary: Dar like a una publicación
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *           format: uuid
   *         example: "a550f2fa-87be-4cde-85df-d68859e5c76c"
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required: [publicacion_id, usuario_id]
   *             properties:
   *               publicacion_id:
   *                 type: string
   *                 format: uuid
   *                 example: "a550f2fa-87be-4cde-85df-d68859e5c76c"
   *               usuario_id:
   *                 type: string
   *                 format: uuid
   *                 example: "b660f3fb-98cf-5def-96eg-e79960e6c87d"
   *     responses:
   *       201:
   *         description: Like agregado exitosamente
   *       409:
   *         description: Ya existe el like
   */

  /**
   * @swagger
   * /publicaciones/{publicacion_id}/likes/{usuario_id}:
   *   delete:
   *     tags: [Publicaciones]
   *     summary: Quitar like
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: publicacion_id
   *         required: true
   *         schema:
   *           type: string
   *           format: uuid
   *         example: "a550f2fa-87be-4cde-85df-d68859e5c76c"
   *       - in: path
   *         name: usuario_id
   *         required: true
   *         schema:
   *           type: string
   *           format: uuid
   *         example: "b660f3fb-98cf-5def-96eg-e79960e6c87d"
   *     responses:
   *       200:
   *         description: Like eliminado
   *       404:
   *         description: Like no encontrado
   */

  return router;
};
