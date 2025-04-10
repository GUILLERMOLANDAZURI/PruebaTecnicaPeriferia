// React
import * as React from "react";
import { useState, useEffect } from "react";

// Material-UI Core Components
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

// Material-UI Icons
import AddBoxIcon from "@mui/icons-material/AddBox";
import RefreshIcon from "@mui/icons-material/Refresh";
import FavoriteIcon from "@mui/icons-material/Favorite";

// Third Party Libraries
import Lottie from "react-lottie";
import { motion } from "framer-motion";

// Redux
import { connect } from "react-redux";

// Services
import { appointmentService } from "../services/appointmentServices";

// Assets
import empty from "../assets/static/lottie/empty.json";

const Home = (props) => {
  const [searchText, setSearchText] = useState("");
  const paginationModel = { page: 0, pageSize: 10 };
  const [open, setOpen] = useState(false);
  const [publicaciones, setPubicaciones] = useState([]);
  const [error, setError] = useState("");
  const [contenido, setContenido] = useState("");

  useEffect(() => {
    getallpublicaciones();
  }, []);

  const getallpublicaciones = async () => {
    try {
      const userData = await appointmentService.publicaciones(
        props?.user?.userData?.usuario_id
      );
      setPubicaciones(userData);
    } catch (error) {
      console.log("Error al cargar las publicaciones :", error);
    }
  };

  const addlike = async (item) => {
    if (item.usuario_dio_like) {
      try {
        const userData = await appointmentService.removelike(
          item.id,
          props?.user?.userData?.usuario_id,
          props?.user?.userData?.token
        );
        getallpublicaciones();
      } catch (error) {
        console.log("Error al eliminar like :", error);
      }
    } else {
      try {
        const userData = await appointmentService.addlike(
          item.id,
          props?.user?.userData?.usuario_id,
          props?.user?.userData?.token
        );
        getallpublicaciones();
      } catch (error) {
        console.log("Error al agregar like :", error);
      }
    }
  };

  const addpublicaciones = async () => {
    try {
      setError("");
      const userData = await appointmentService.addpublicaciones(
        props?.user?.userData?.usuario_id,
        contenido,
        props?.user?.userData?.token
      );
      setContenido("");
      setOpen(false);
      getallpublicaciones();
    } catch (error) {
      setError("Error al guardar la publicación. Por favor intente nuevamente");
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <motion.div animate={props.animations["fadeInDown"]}>
            {"¡Bienvenido! "}
            <Tooltip title="Agregar" placement="bottom">
              <IconButton aria-label="Agregar" onClick={() => setOpen(true)}>
                <AddBoxIcon color="primary" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Recargar" placement="right">
              <IconButton
                aria-label="Agregar"
                onClick={() => getallpublicaciones()}
              >
                <RefreshIcon color="primary" />
              </IconButton>
            </Tooltip>
          </motion.div>
        </Typography>
      </Toolbar>

      {publicaciones.length == 0 ? (
        <motion.div animate={props.animations["fadeInDown"]}>
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: empty,
              rendererSettings: {
                preserveAspectRatio: "xMidYMid slice",
              },
            }}
            height={400}
            width={400}
          />
          <Typography variant="h6" component="h2" sx={{ textAlign: "center" }}>
            No se ha encontado información.
          </Typography>
        </motion.div>
      ) : (
        <Container>
          <motion.div animate={props.animations["fadeInDown"]}>
            <Grid container spacing={2} padding={3}>
              {publicaciones.map((publicacion) => (
                <Grid key={publicacion.id} size={{ xs: 12, md: 4 }}>
                  <Card
                    variant="outlined"
                    sx={{
                      height: 250,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardContent
                      sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between", // Esto distribuye el espacio
                      }}
                    >
                      <div>
                        {" "}
                        {/* Contenedor para el contenido superior */}
                        <Typography variant="h6" sx={{ marginBottom: 1 }}>
                          {publicacion.autor}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            marginBottom: 2,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                          }}
                        >
                          {publicacion.contenido.length > 50
                            ? `${publicacion.contenido.substring(0, 50)}...`
                            : publicacion.contenido}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="textSecondary"
                          sx={{ display: "block" }}
                        >
                          {new Date(
                            publicacion.fecha_creacion
                          ).toLocaleDateString("es-ES", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </Typography>
                      </div>

                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        sx={{ mt: "auto" }}
                      >
                        <Button
                          fullWidth
                          variant={
                            publicacion.usuario_dio_like
                              ? "contained"
                              : "outlined"
                          }
                          startIcon={<FavoriteIcon />}
                          onClick={() => addlike(publicacion)}
                        >
                          Me gusta ({publicacion.total_likes})
                        </Button>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      )}

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={{ ...modalStyle }}>
          <div>
            <Typography variant="h6" component="h2">
              Publicación
            </Typography>

            <TextField
              label="Contenido"
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
              multiline
              rows={4}
              fullWidth
              margin="normal"
            />
            {error && (
              <Typography color="error" sx={{ marginBottom: 2 }}>
                {error}
              </Typography>
            )}
            <Button
              onClick={addpublicaciones}
              variant="contained"
              color="primary"
            >
              Guardar
            </Button>
          </div>
        </Box>
      </Modal>
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

export default connect(mapStateToProps)(Home);
