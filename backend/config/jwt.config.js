export const JWT_CONFIG = {
  secret: process.env.JWT_SECRET || 'clave_secreta_desarrollo',
  expiresIn: '1h'
};