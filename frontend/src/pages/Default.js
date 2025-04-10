// React y Redux
import React, { useState } from "react";
import { connect } from "react-redux";
import { setUser } from "../rutes/actions";

// Material-UI Components
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Link, Divider, Stack } from "@mui/material";

// Material-UI Theming
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Material-UI Icons
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

// Assets
import foto from "../assets/static/pages/imagen.png";

const Default = (props) => {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

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
                <div align="center">
                  <img src={foto} width="60%" />
                  <h2 className="font-bold">Página no encontrada</h2>
                  <p>
                    Lo sentimos, la página que buscas no existe. Por favor,
                    verifica la URL o regresa a la página principal.
                  </p>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Default);
