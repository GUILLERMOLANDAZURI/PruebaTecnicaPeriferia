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
  Card,
  CardContent,
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
import loadin from "../assets/static/lottie/Animation6.json";

const Login = (props) => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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

  const login = async () => {
    setOpen(true);
    if (!email || !password) {
      setError("Por favor ingrese email y contraseña");
      setOpen(false);
      return;
    }

    try {
      setError("");
      const userData = await appointmentService.login(email, password);
      props.setUser({ userData });
      navigate("/admin");
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
              sx={{ maxWidth: "800px", marginBottom: 12 }}
            >
              <Grid size={{ xs: 12, md: 6 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    width: "100%",
                  }}
                >
                  <div>
                    <h2 className="font-bold">¡Únete a nuestra comunidad!</h2>
                    <p>
                      Conecta con amigos, comparte tus momentos favoritos y
                      descubre contenido increíble en nuestra red social.
                    </p>
                  </div>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography
                      variant="body1"
                      align="center"
                      sx={{ marginBottom: 2 }}
                    >
                      Bienvenido, inicia sesión para continuar
                    </Typography>

                    <TextField
                      fullWidth
                      label="Correo electrónico"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      sx={{ marginBottom: 2 }}
                    />
                    <TextField
                      fullWidth
                      label="Contraseña"
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
                      sx={{ marginBottom: 2 }}
                      onClick={login}
                    >
                      Iniciar Sesión
                    </Button>

                    <Typography variant="body2" sx={{ marginBottom: 2 }}>
                      ¿No tienes una cuenta?
                    </Typography>
                    <Button
                      fullWidth
                      variant="outlined"
                      sx={{ marginBottom: 2 }}
                      onClick={() => {
                        navigate("/signin");
                      }}
                    >
                      Registrarse
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, md: 12 }}>
                <Divider></Divider>
                <Stack
                  direction="row"
                  sx={{
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 1,
                  }}
                >
                  <Typography variant="body2" color="textSecondary">
                    Hecho por{" "}
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
  };
};

const mapDispatchToProps = {
  setUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
