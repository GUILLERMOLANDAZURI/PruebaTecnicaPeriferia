
-- Activar extensión para UUIDs aleatorios
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Tabla de usuarios
CREATE TABLE usuarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(150) UNIQUE NOT NULL,
    contrasena TEXT NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de publicaciones
CREATE TABLE publicaciones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID NOT NULL,
    contenido TEXT NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Tabla de likes
CREATE TABLE likes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    publicacion_id UUID NOT NULL,
    usuario_id UUID NOT NULL,
    fecha_like TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (publicacion_id) REFERENCES publicaciones(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    UNIQUE (publicacion_id, usuario_id)
);


-- Usuarios
INSERT INTO usuarios (nombre, correo, contrasena)
VALUES
    ('Juan Pérez', 'juan@example.com', '123456'),
    ('Ana Gómez', 'ana@example.com', 'abcdef'),
    ('Carlos Ruiz', 'carlos@example.com', 'qwerty');

-- Publicaciones
INSERT INTO publicaciones (usuario_id, contenido)
VALUES
    (
        (SELECT id FROM usuarios WHERE correo = 'juan@example.com'),
        '¡Hola mundo! Esta es mi primera publicación.'
    ),
    (
        (SELECT id FROM usuarios WHERE correo = 'ana@example.com'),
        '¡Buenos días a todos!'
    ),
    (
        (SELECT id FROM usuarios WHERE correo = 'juan@example.com'),
        'Segundo post de Juan 😎'
    );

-- Likes
INSERT INTO likes (publicacion_id, usuario_id)
VALUES
    (
        (SELECT publicaciones.id FROM publicaciones
         JOIN usuarios ON publicaciones.usuario_id = usuarios.id
         WHERE usuarios.correo = 'juan@example.com' AND contenido LIKE '%primera publicación%'),
        (SELECT id FROM usuarios WHERE correo = 'ana@example.com')
    ),
    (
        (SELECT publicaciones.id FROM publicaciones
         JOIN usuarios ON publicaciones.usuario_id = usuarios.id
         WHERE usuarios.correo = 'ana@example.com'),
        (SELECT id FROM usuarios WHERE correo = 'juan@example.com')
    ),
    (
        (SELECT publicaciones.id FROM publicaciones
         JOIN usuarios ON publicaciones.usuario_id = usuarios.id
         WHERE contenido LIKE '%Segundo post%'),
        (SELECT id FROM usuarios WHERE correo = 'carlos@example.com')
    );
