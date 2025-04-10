// React y Router
import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import { setUser } from "../rutes/actions";

// Material-UI Components
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";

// Third Party Libraries
import { motion } from "framer-motion";

// Services
import { appointmentService } from "../services/appointmentServices";

const Perfil = (props) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUpdate = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      setError("Todos los campos de contraseña son obligatorios.");
      return;
    }

    if (newPassword.length < 8) {
      setError("La nueva contraseña debe tener al menos 8 caracteres.");
      return;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      setError("La contraseña debe contener al menos una letra y un número.");
      return;
    }

    if (oldPassword === newPassword) {
      setError("La nueva contraseña debe ser diferente a la anterior.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("La nueva contraseña y la confirmación no coinciden.");
      return;
    }

    try {
      setError("");
      const userData = await appointmentService.updateuser(
        props?.user?.userData?.usuario_id,
        oldPassword,
        newPassword,
        props?.user?.userData?.token
      );

      props.setUser(null);
      navigate("/login");
    } catch (error) {
      setError("Error al actualizar la contraseña. Intente nuevamente.");
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <motion.div animate={props.animations["fadeInLeft"]}>
            {"Perfil"}
          </motion.div>
        </Typography>
      </Toolbar>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{ maxWidth: "800px", marginBottom: 22 }}
        >
          <Grid xs={false} size={{ xs: 12, md: 3 }} />
          <Grid size={{ xs: 12, md: 6 }}>
            <div align="center">
              <h2 className="font-bold">Actualiza tus datos</h2>
              <p>
                Modifica tu información personal para mantener tu perfil
                actualizado.
              </p>
            </div>
            <TextField
              fullWidth
              label="Nombre Completo"
              id="fullName"
              value={props?.user?.userData?.nombre}
              disabled
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              label="Correo Electrónico"
              id="email"
              value={props?.user?.userData?.correo}
              disabled
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              label="Contraseña Anterior"
              id="oldPassword"
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              label="Nueva Contraseña"
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              label="Confirmar Nueva Contraseña"
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            {error && (
              <Typography color="error" sx={{ marginBottom: 2 }}>
                {error}
              </Typography>
            )}
            <Button
              fullWidth
              variant="contained"
              onClick={handleUpdate}
              sx={{ marginBottom: 2 }}
            >
              Actualizar
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  setUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Perfil);
