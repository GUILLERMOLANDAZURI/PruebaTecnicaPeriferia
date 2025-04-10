import { M_usuarios } from "../models/M_usuarios.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_CONFIG } from "../config/jwt.config.js";

export class C_usuarios {
  constructor() {}

  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: "Credenciales incompletas" });
      }

      const usuario = await M_usuarios.getByEmail(email);
      if (!usuario)
        return res.status(401).json({ error: "Credenciales inválidas" });

      const validPassword = await bcrypt.compare(password, usuario.contrasena);
      if (!validPassword)
        return res.status(401).json({ error: "Credenciales inválidas" });

      const token = jwt.sign(
        { id: usuario.id, email: usuario.correo },
        JWT_CONFIG.secret,
        { expiresIn: JWT_CONFIG.expiresIn }
      );

      res.json({
        token,
        nombre: usuario.nombre,
        correo: usuario.correo,
        usuario_id: usuario.id,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const usuarios = await M_usuarios.getAll();
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ error: "Datos incompletos" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const nuevoUsuario = await M_usuarios.create({
        nombre: name,
        correo: email,
        contrasena: hashedPassword,
      });
      res.status(201).json(nuevoUsuario);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const usuario = await M_usuarios.getById(req.params.id);
      if (!usuario)
        return res.status(404).json({ error: "Usuario no encontrado" });
      res.json(usuario);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updatePassword(req, res) {
    try {
      const userId = req.params.id;
      const { currentPassword, newPassword } = req.body;

      if (!currentPassword || !newPassword) {
        return res.status(400).json({ error: "Datos incompletos" });
      }

      const usuario = await M_usuarios.getById(userId);
      if (!usuario) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      const validPassword = await bcrypt.compare(
        currentPassword,
        usuario.contrasena
      );
      if (!validPassword) {
        return res.status(401).json({ error: "Contraseña actual incorrecta" });
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      await M_usuarios.updatePassword(userId, hashedNewPassword);

      res.json({ message: "Contraseña actualizada exitosamente" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
