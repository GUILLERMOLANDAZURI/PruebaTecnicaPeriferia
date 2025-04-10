const api = "http://localhost:2000"; // Cambiado el puerto a 2000

export const appointmentService = {
  login,
  signin,
  updateuser,
  publicaciones,
  addlike,
  removelike,
  addpublicaciones,
};

async function login(email, password) {
  try {
    const requestOptions = {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    };
    const url = `${api}/usuarios/login`;
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error("Error en la autenticación");
    }
    return await response.json();
  } catch (error) {
    console.log("Error en login:", error);
    throw error;
  }
}

async function signin(name, email, password) {
  try {
    const requestOptions = {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    };
    const url = `${api}/usuarios/`;
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error("Error en el registro");
    }
    return await response.json();
  } catch (error) {
    console.log("Error en el registro :", error);
    throw error;
  }
}

async function updateuser(usuario_id, currentPassword, newPassword, token) {
  try {
    const requestOptions = {
      method: "PUT",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        currentPassword,
        newPassword,
      }),
    };
    const url = `${api}/usuarios/${usuario_id}/password`;
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error("Error al actualizar contraseña");
    }
    return await response.json();
  } catch (error) {
    console.log("Error al actualizar contraseña :", error);
    throw error;
  }
}

async function publicaciones(usuario_id) {
  try {
    const requestOptions = {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usuario_id,
      }),
    };
    const url = `${api}/publicaciones/list`;
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error("Error con las publicaciones");
    }
    return await response.json();
  } catch (error) {
    console.log("Error en publicaciones :", error);
    throw error;
  }
}

async function addlike(publicacion_id, usuario_id, token) {
  try {
    const requestOptions = {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        publicacion_id,
        usuario_id,
      }),
    };

    const url = `${api}/publicaciones/${publicacion_id}/likes`;

    console.log("url", url);
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error("Error al agregar like");
    }
    return await response.json();
  } catch (error) {
    console.log("Error al agregar like :", error);
    throw error;
  }
}

async function removelike(publicacion_id, usuario_id, token) {
  try {
    const requestOptions = {
      method: "DELETE",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    const url = `${api}/publicaciones/${publicacion_id}/likes/${usuario_id}`;
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error("Error al eliminar like");
    }
    return await response.json();
  } catch (error) {
    console.log("Error al eliminar like :", error);
    throw error;
  }
}

async function addpublicaciones(usuario_id, contenido, token) {
  try {
    const requestOptions = {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        usuario_id,
        contenido,
      }),
    };
    const url = `${api}/publicaciones/`;
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error("Error con las publicaciones");
    }
    return await response.json();
  } catch (error) {
    console.log("Error en publicaciones :", error);
    throw error;
  }
}
