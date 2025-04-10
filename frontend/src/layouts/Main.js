import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout, ThemeSwitcher } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import { Link } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SearchIcon from "@mui/icons-material/Search";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Home from "../pages/Home";
import Default from "../pages/Default";
import Perfil from "../pages/Perfil";
import { enterAnimations } from "../animations/enterAnimations";
import { connect } from "react-redux";
import { setUser } from "../rutes/actions";
import { useNavigate } from "react-router-dom";

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function ToolbarActionsSearch({ setUser }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    if (typeof setUser === "function") {
      setUser(null);
      navigate("/login");
    }
  };

  return (
    <Stack direction="row">
      <Tooltip title="Search" enterDelay={1000}>
        <div>
          <IconButton
            type="button"
            aria-label="search"
            sx={{
              display: { xs: "inline", md: "none" },
            }}
          >
            <SearchIcon />
          </IconButton>
        </div>
      </Tooltip>

      <Tooltip title="Cerrar sessión" placement="left">
        <div>
          <IconButton type="button" aria-label="Cerrar" onClick={handleLogout}>
            <ExitToAppIcon color="primary" />
          </IconButton>
        </div>
      </Tooltip>
    </Stack>
  );
}

function Footer() {
  return (
    <Box sx={{ textAlign: "center", p: 2 }}>
      <Typography variant="body2" color="textSecondary">
        © {new Date().getFullYear()} Hecho por{" "}
        <Link href="https://landazuri.online" target="_blank" underline="none">
          Guillermo Landazuri Amaya
        </Link>
      </Typography>
    </Box>
  );
}

function CustomAppTitle() {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Typography variant="h6">PRUEBA</Typography>
      <Chip size="small" label="BETA" color="info" />
      <ThemeSwitcher />
    </Stack>
  );
}

function Main(props) {
  const { window } = props;
  const router = useDemoRouter("/inicio");

  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <AppProvider
      navigation={[
        {
          segment: "inicio",
          title: "Inicio",
          icon: <HomeIcon />,
        },
        {
          segment: "perfil",
          title: "Perfil",
          icon: <DashboardIcon />,
        },
      ]}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <DashboardLayout
          slots={{
            appTitle: CustomAppTitle,
            toolbarActions: () => (
              <ToolbarActionsSearch setUser={props.setUser} />
            ),
          }}
          defaultSidebarCollapsed={true}
          sx={{ flex: 1 }}
        >
          {router.pathname === "/inicio" && (
            <Home animations={enterAnimations} />
          )}
          {router.pathname === "/perfil" && (
            <Perfil animations={enterAnimations} />
          )}

          {router.pathname !== "/inicio" && router.pathname !== "/perfil" && (
            <Default />
          )}
        </DashboardLayout>
        <Footer />
      </Box>
    </AppProvider>
  );
}

Main.propTypes = {
  window: PropTypes.func,
};

const mapDispatchToProps = {
  setUser,
};

export default connect(null, mapDispatchToProps)(Main);
