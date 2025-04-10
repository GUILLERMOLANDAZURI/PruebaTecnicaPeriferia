import { pool } from "../config/connection.js";

export class M_publicaciones {
  constructor() {}

  static async getAll(usuario_id) {
    const query = `
      SELECT 
      p.*,
      u.nombre AS autor,
      COUNT(DISTINCT l.usuario_id) AS total_likes,
      EXISTS (
        SELECT 1
        FROM likes l2
        WHERE l2.publicacion_id = p.id
        AND l2.usuario_id = $1
      ) AS usuario_dio_like
    FROM publicaciones p
    JOIN usuarios u ON p.usuario_id = u.id
    LEFT JOIN likes l ON p.id = l.publicacion_id
    GROUP BY p.id, u.nombre
    ORDER BY p.fecha_creacion DESC
    `;

    const values = [usuario_id];
    const result = await pool.query(query, values);
    return result.rows;
  }

  static async create({ usuario_id, contenido }) {
    const query = `
      INSERT INTO publicaciones(usuario_id, contenido)
      VALUES ($1, $2)
      RETURNING *
    `;
    const values = [usuario_id, contenido];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async addLike({ publicacion_id, usuario_id }) {
    const query = `
      INSERT INTO likes(publicacion_id, usuario_id)
      VALUES ($1, $2)
      RETURNING *
    `;
    const values = [publicacion_id, usuario_id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async removeLike({ publicacion_id, usuario_id }) {
    const query = `
      DELETE FROM likes 
      WHERE publicacion_id = $1 AND usuario_id = $2
      RETURNING *
    `;
    const values = [publicacion_id, usuario_id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }
}
