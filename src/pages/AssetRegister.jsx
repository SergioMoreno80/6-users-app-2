import React, { useState, useEffect } from "react";
import activosApi from "../apis/activosApi";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import {
  TextField,
  Grid,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  Snackbar,
  MenuItem,
} from "@mui/material";
import Box from "@mui/material/Box";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useActivos } from "../hooks/useActivos";

dayjs.locale("es");

const BASE_URL = "";
const clasificacion = [
  {
    value: "P",
    name: "PROPIO",
  },
  {
    value: "C",
    name: "CONSIGNACION",
  },
];
const estatusVal = [
  {
    value: "A",
    name: "ACTIVO",
  },
  {
    value: "I",
    name: "INACTIVO",
  },
];

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export const AssetRegister = ({ handlerCloseForm }) => {

  const { initialActivoForm, handlerAddActivo } = useActivos(); //inicializar forma
  const [activoForm, setActivoForm] = useState(initialActivoForm);
  const { nombre,
    descripcion,
    fabricante_id,
    modelo,
    no_serie,
    tipo,
    grupoactivo_id,
    proveedor_id,
    factura,
    estatus,
    clave_busqueda,
    importe,
    fecha_compra,
    fecha_ingreso,
    imagen } = activoForm;

  const [proveedores, setProveedores] = useState([]);
  const [gruposActivos, setGruposActivos] = useState([]);
  const [fabricantes, setFabricantes] = useState([]);
  ////ejemplo de carga de imagenes desde react y spring data
  const [alertaAbierta, setAlertaAbierta] = useState(false);

  //Manejo de importes y monto
  //const [importe, setMonto] = useState(""); // Inicializa el estado con un valor numérico

  const onInputChange = ({ target }) => {
    console.log(target.value)
    console.log(target.name)
    const { name, value } = target;
    setActivoForm({
        ...activoForm,
        [name]: value,
    })
}

const handleFechaChange = (date, campo) => {
  // Actualizar el estado con la nueva fecha
  console.log(campo)
  console.log(date)
  setActivoForm({
    ...activoForm,
    [campo]: date,
  });
};
  const handleAbrirAlerta = () => {
    setAlertaAbierta(true);
  };

  const handleCerrarAlerta = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertaAbierta(false);
  };

  const manejarCambioImagen = (e) => {
    const archivoImagen = e.target.files[0];
    //setImagen(archivoImagen);
    console.log(archivoImagen)
    setActivoForm({
      ...activoForm,
      imagen: archivoImagen,
    });

  };

  useEffect(() => {
    // Otro efecto para realizar acciones adicionales cuando cambia el valor
  }, [importe]);

  const manejarCambio = (e) => {
    const valorEntrada = e.target.value;
    // Convierte el valor a un número y maneja NaN si no es un número válido
    // Elimina caracteres no numéricos, excepto el punto decimal
  const valorNumerico = parseFloat(valorEntrada.replace(/[^\d.]/g, '')) || 0;

    // Formatea el número como moneda en pesos mexicanos (MXN)
    const montoFormateado = new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(valorNumerico);

    console.log(importe)
    setActivoForm({
      ...activoForm,
      importe: valorNumerico,
    });
  };
  //load data
  useEffect(() => {
    const obtenerGruposActivos = async () => {
      try {
        const respuesta = await activosApi.get(`${BASE_URL}/cargaGrupoActivo`);
        const datos = respuesta.data;
        setGruposActivos(datos);
      } catch (error) {
        console.error("Error al obtener datos de grupos de activos:", error);
      }
    };
    const obtenerFabricantes = async () => {
      try {
        const respuesta = await activosApi.get(`${BASE_URL}/cargaFabricante`);
        const datos = respuesta.data;
        setFabricantes(datos);
      } catch (error) {
        console.error("Error al obtener datos de fabricantes:", error);
      }
    };
    // Función para obtener datos de la API
    const obtenerProveedores = async () => {
      try {
        const respuesta = await activosApi.get(`${BASE_URL}/cargaProveedor`);
        const datos = await respuesta.data;
        setProveedores(datos);
      } catch (error) {
        console.error("Error al obtener datos de proveedores:", error);
      }
    };

    // Llamada a la función para obtener datos cuando el componente se monta
    obtenerProveedores();
    obtenerGruposActivos();
    obtenerFabricantes();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
  // Imprimir información de activoForm en la consola
      console.log('Información de activoForm:', activoForm);
      if (!fecha_compra || !fecha_ingreso) {
      setAlertaAbierta(true);
      //console.error("Por favor, completa todos los campos obligatorios.");

      return;
    }

  
      console.error("Por favor, enviando form");
    //return;
    handlerAddActivo(activoForm);
  };

  const onCloseForm = () => {
    handlerCloseForm();
    setActivoForm(initialActivoForm);
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}
      >
        <Box p={2} textAlign="center" bgcolor="#0E0E2C" color="white">
          <RequestQuoteIcon color="warning" />
          <Typography variant="h6">Registro de Activos</Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} marginTop={2}>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                id="nombre"
                label="Nombre"
                name="nombre"
                autoComplete="Nombre"
                value={ nombre}
                autoFocus
                onChange={onInputChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                id="descripcion"
                label="Descripcion"
                name="descripcion"
                autoComplete="Descripcion"
                value={ descripcion}
                onChange={onInputChange} />

            </Grid>

            <Grid item xs={4}>
              <FormControl fullWidth required>
                <InputLabel>Fabricante</InputLabel>
                <Select
                  value={fabricante_id}
                  onChange={onInputChange}
                  name="fabricante_id"
                >
                  {fabricantes.map((option) => (
                    <MenuItem
                      key={option.fabricante_id}
                      value={option.fabricante_id}
                    >
                      {option.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <TextField
                required
                fullWidth
                id="modelo"
                label="Modelo"
                name="modelo"
                autoComplete="modelo"
                value={ modelo}
                onChange={onInputChange} />

            </Grid>
            <Grid item xs={4}>
              <TextField
                autoComplete="given-serie"
                name="no_serie"
                required
                fullWidth
                id="no_serie"
                label="No. de Serie"
                value={ no_serie}
                onChange={onInputChange} />

            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth required>
                <InputLabel>Clasificacion</InputLabel>
                <Select
                  value={tipo}
                  onChange={onInputChange}
                  name="tipo"
                >
                  {clasificacion.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth required>
                <InputLabel>Estatus</InputLabel>
                <Select
                  value={estatus}
                  onChange={onInputChange}
                  name="estatus"
                >
                  {estatusVal.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.name}
                    </MenuItem>
                    
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth required>
                <InputLabel>Grupo de Activo</InputLabel>
                <Select value={grupoactivo_id} 
                onChange={onInputChange}
                  name="grupoactivo_id"
                  >
                  {gruposActivos.map((gruposActivos) => (
                    <MenuItem
                      key={gruposActivos.grupoactivo_id}
                      value={gruposActivos.grupoactivo_id}
                    >
                      {gruposActivos.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth required>
                <InputLabel>Proveedor</InputLabel>
                <Select
                  value={proveedor_id}
                  onChange={onInputChange}
                  name="proveedor_id"
                >
                  {proveedores.map((proveedor) => (
                    <MenuItem
                      key={proveedor.proveedor_id}
                      value={proveedor.proveedor_id}
                    >
                      {proveedor.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                fullWidth
                id="factura"
                label="Factura"
                name="factura"
                autoComplete="factura"
                value={ factura}
                onChange={onInputChange} />

            </Grid>

            <Grid item xs={4} md={4}>
              <TextField
                label="Importe"
                id="importe"
                type="number"
                value={importe}
                onChange={manejarCambio}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton edge="start" disabled>
                        <AttachMoneyIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Fecha de Compra"
                  id="fechaCompra"
                  value={fecha_compra}
                  onChange={(date) => handleFechaChange(date, 'fecha_compra')}
                  //onChange={(date) => setFechaCompra(date)}
                  //renderInput={(params) => <TextField {...params} required />}
                  slotProps={{ textField: { variant: 'outlined' } }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Fecha de Inicio de Uso"
                  id="fechaInicioUso"
                  value={fecha_ingreso}
                  onChange={(date) => handleFechaChange(date, 'fecha_ingreso')}
                  //renderInput={(params) => <TextField {...params} required />}
                  slotProps={{ textField: { variant: 'outlined' } }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                fullWidth
                id="clave_busqueda"
                label="Alias o clave de busqueda"
                name="clave_busqueda"
                autoComplete="clave_busqueda"
                value={ clave_busqueda}
                onChange={onInputChange} />

            </Grid>
            <input type="hidden"
                name="estatus"
                value={estatus} 
                onChange={(e) => setEstatus(e.target.value)}
                />

            <Grid item xs={4}>
              <Button
                component="label"
                variant="contained"
                color="success"
                startIcon={<CloudUploadIcon />}
              >
                cargar imagen
                <VisuallyHiddenInput
                  type="file"
                  accept="image/*"
                  //onChange={(e) => setImagen(e.target.files[0])}
                  onChange={manejarCambioImagen}
                />
              </Button>
              <Snackbar
                open={alertaAbierta}
                autoHideDuration={6000}
                onClose={handleCerrarAlerta}
                message="Fecha de compra e inicio de uso es requerida."
              ></Snackbar>
            </Grid>
            <Grid item xs={6}>
              <Button type="submit" variant="contained" color="primary">
                GUARDAR
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};
