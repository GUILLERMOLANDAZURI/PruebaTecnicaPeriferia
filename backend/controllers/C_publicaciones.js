import { M_publicaciones } from "../models/M_publicaciones.js";

export class C_publicaciones {
  constructor() {}

  async getAll(req, res) {
    try {
      const { usuario_id } = req.body;

      if (!usuario_id) {
        return res.status(400).json({ error: "usuario_id requerido" });
      }

      const publicaciones = await M_publicaciones.getAll(usuario_id);
      res.json(publicaciones);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const { usuario_id, contenido } = req.body;

      if (!usuario_id || !contenido) {
        return res.status(400).json({ error: "Datos incompletos" });
      }

      const nuevaPublicacion = await M_publicaciones.create({
        usuario_id,
        contenido,
      });
      res.status(201).json(nuevaPublicacion);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async addLike(req, res) {
    try {
      const { publicacion_id, usuario_id } = req.body;

      const like = await M_publicaciones.addLike({
        publicacion_id,
        usuario_id,
      });

      res.status(201).json(like);
    } catch (error) {
      if (error.code === "23505") {
        return res
          .status(409)
          .json({ error: "El usuario ya dio like a esta publicación" });
      }
      res.status(500).json({ error: error.message });
    }
  }

  async removeLike(req, res) {
    try {
      const { publicacion_id, usuario_id } = req.params;

      const like = await M_publicaciones.removeLike({
        publicacion_id,
        usuario_id,
      });

      if (!like) {
        return res.status(404).json({ error: "Like no encontrado" });
      }

      res.json({ message: "Like eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
