import { pool } from "../config/connection.js";

export class M_usuarios {
  constructor() {}

  static async getAll() {
    const query = "SELECT * FROM usuarios";
    const result = await pool.query(query);
    return result.rows;
  }

  static async create({ nombre, correo, contrasena }) {
    const query = `
      INSERT INTO usuarios(nombre, correo, contrasena)
      VALUES ($1, $2, $3)
      RETURNING correo, fecha_creacion
    `;
    const values = [nombre, correo, contrasena];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async getByEmail(email) {
    const query =
      "SELECT id, nombre, correo, contrasena FROM usuarios WHERE correo = $1";
    const result = await pool.query(query, [email]);
    return result.rows[0];
  }

  static async getById(id) {
    const query = "SELECT * FROM usuarios WHERE id = $1";
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async updatePassword(userId, newPassword) {
    const query = `
      UPDATE usuarios 
      SET contrasena = $1 
      WHERE id = $2 
      RETURNING id`;
    const result = await pool.query(query, [newPassword, userId]);
    return result.rows[0];
  }
}
