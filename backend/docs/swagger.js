import swaggerJSDoc from 'swagger-jsdoc';

export const SWAGGER_CONFIG = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'PRUEBA',
      version: '1.0.0',
      description: 'Documentación de la PRUEBA'
    },
    servers: [{
      url: 'http://localhost:2000',
      description: 'Servidor local'
    }],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    tags: [
      { name: 'Usuarios', description: 'Operaciones con usuarios' },
      { name: 'Publicaciones', description: 'Operaciones con publicaciones' }
    ]
  },
  apis: ['./routes/*.js']
};

export const swaggerSpec = swaggerJSDoc(SWAGGER_CONFIG);