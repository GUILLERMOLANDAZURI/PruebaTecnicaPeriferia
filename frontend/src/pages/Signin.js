// React y Router
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import { setUser } from "../rutes/actions";

// Material-UI Components
import {
  Backdrop,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Link,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

// Material-UI Theming
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Material-UI Icons
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

// Third Party Libraries
import Lottie from "react-lottie";

// Services
import { appointmentService } from "../services/appointmentServices";

// Assets
import loadin from "../assets/static/lottie/empty.json";
import foto from "../assets/static/pages/imagen.png";

const Signin = (props) => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  useEffect(() => {
    if (props?.user?.userData?.correo) {
      navigate("/admin");
      return;
    }
  }, [props.user, navigate]);

  const signin = async () => {
    setOpen(true);
    if (!name || !email || !password) {
      setError("Por favor ingrese todos los campos requeridos");
      setOpen(false);
      return;
    }
    setOpen(false);

    try {
      setError("");
      const userData = await appointmentService.signin(name, email, password);
      setExito("Usuario creado con éxito, por favor inicie sesión");
    } catch (error) {
      setError("Credenciales incorrectas. Por favor intente nuevamente");
    } finally {
      setOpen(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundColor: darkMode ? "#121212" : "#f5f5f5",
          color: darkMode ? "#ffffff" : "#000000",
          transition: "background-color 0.3s, color 0.3s",
          position: "relative",
        }}
      >
        <Backdrop
          sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
          open={open}
        >
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: loadin,
            }}
            height={"100%"}
            width={"100%"}
          />
        </Backdrop>
        <Tooltip
          title={darkMode ? "Modo claro" : "Modo oscuro"}
          placement="left"
        >
          <IconButton
            aria-label="toggle dark mode"
            color={darkMode ? "white" : "primary"}
            onClick={() => setDarkMode(!darkMode)}
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
            }}
          >
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Tooltip>

        <Container fixed>
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
                {exito == "" ? (
                  <>
                    <div align="center">
                      <img src={foto} width="60%" />
                      <h2 className="font-bold">Únete a Nuestra Red Social</h2>
                      <p>
                        Regístrate para conectarte con amigos y explorar nuevas
                        oportunidades.
                      </p>
                    </div>
                    <TextField
                      fullWidth
                      label="Nombre Completo"
                      id="fullName"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      sx={{ marginBottom: 2 }}
                    />
                    <TextField
                      fullWidth
                      label="Correo Electrónico"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      sx={{ marginBottom: 2 }}
                    />
                    <TextField
                      fullWidth
                      label="Contraseña"
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                      onClick={signin}
                      sx={{ marginBottom: 2 }}
                    >
                      Registrarse
                    </Button>

                    <Typography
                      variant="body2"
                      align="center"
                      sx={{ marginBottom: 2 }}
                    >
                      ¿Ya tienes una cuenta?
                    </Typography>
                  </>
                ) : (
                  <div align="center">
                    <img src={foto} width="60%" />
                    <h2 className="font-bold">{exito}</h2>
                  </div>
                )}
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Iniciar Sesión
                </Button>
              </Grid>
              <Grid xs={false} size={{ xs: 12, md: 3 }} />
              <Grid size={{ xs: 12, md: 12 }}>
                <Divider
                  sx={{
                    marginTop: 1,
                  }}
                ></Divider>
                <Stack
                  direction="row"
                  sx={{
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 1,
                  }}
                >
                  <Typography variant="body2" color="textSecondary">
                    Creado por{" "}
                    <Link
                      href="https://landazuri.online"
                      target="_blank"
                      underline="none"
                    >
                      Guillermo Landazuri Amaya
                    </Link>
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    © {new Date().getFullYear()}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    opcion: state.opcion,
  };
};

const mapDispatchToProps = {
  setUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
