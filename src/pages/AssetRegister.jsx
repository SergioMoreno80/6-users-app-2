import React, { useState, useEffect } from "react";
import activosApi from "../apis/activosApi";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import PropTypes from "prop-types";
import { NumericFormat } from "react-number-format";
import SaveSharpIcon from "@mui/icons-material/SaveSharp";
import Autocomplete from "@mui/material/Autocomplete";

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
import { useActivos } from "../hooks/useActivos";

dayjs.locale("es");

const BASE_URL = "";

// const estatusVal = [
//   {
//     value: "A",
//     name: "ACTIVO",
//   },
//   {
//     value: "I",
//     name: "INACTIVO",
//   },
// ];

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
const NumericFormatCustom = React.forwardRef(function NumericFormatCustom(
  props,
  ref
) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      valueIsNumericString
      prefix="$"
    />
  );
});

NumericFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
export const AssetRegister = ({ activoSelected, handlerCloseForm }) => {
  const { initialActivoForm, handlerAddActivo, errors } = useActivos(); //inicializar forma

  const [activoForm, setActivoForm] = useState(initialActivoForm);
  const {
    nombre,
    descripcion,
    fabricante_id,
    modelo,
    no_serie,
    clasificacion,
    grupoactivo_id,
    proveedor_id,
    factura,
    estatus,
    clave_busqueda,
    importe,
    fecha_compra,
    fecha_ingreso,
    imagen,
    doc,
    documento,
    foto,
  } = activoForm;

  ////ejemplo de carga de imagenes desde react y spring data
  const [alertaAbierta, setAlertaAbierta] = useState(false);
// manejo de edicion de activos activo_id clave.

useEffect(() => {
  if (activoSelected) {
    setActivoForm({
      ...activoSelected,
      fecha_compra: dayjs(activoSelected.fecha_compra),
      fecha_ingreso: dayjs(activoSelected.fecha_ingreso),
    });
  }
}, [activoSelected]);

  //Manejo de importes y monto
  //const [importe, setMonto] = useState(""); // Inicializa el estado con un valor numérico

  const onInputChange = ({ target }) => {
    console.log(target.value);
    console.log(target.name);
    const { name, value } = target;
    setActivoForm({
      ...activoForm,
      [name]: value,
    });
  };

  const onInputChangeCombo = (event, newValue, fieldName) => {
    if (newValue) {
      const newValueId = newValue[fieldName + "_id"]; // Obtener el ID del elemento seleccionado
      setActivoForm({
        ...activoForm,
        [fieldName + "_id"]: newValueId,
      });
    } else {
      // Si no se selecciona ningún elemento, establecer el ID del campo en vacío o null, según corresponda
      setActivoForm({
        ...activoForm,
        [fieldName + "_id"]: null, // O establecer en vacío: ""
      });
    }
  };

  const handleFechaChange = (date, campo) => {
    // Actualizar el estado con la nueva fecha
    console.log(campo);
    console.log(date);
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
    const archivo = e.target.files[0];
    setActivoForm({
      ...activoForm,
      imagen: archivo,
      foto: archivo.name,
    });
    console.log(activoForm);
  };

  const manejarCambioDocumento = (e) => {
    const archivo = e.target.files[0];
    setActivoForm({
      ...activoForm,
      doc: archivo,
      documento: archivo.name,
    });
    console.log(activoForm);
  };

  useEffect(() => {
    // Otro efecto para realizar acciones adicionales cuando cambia el valor
  }, [importe]);

  const manejarCambio = (e) => {
    const valorEntrada = e.target.value;
    // Convierte el valor a un número y maneja NaN si no es un número válido
    // Elimina caracteres no numéricos, excepto el punto decimal
    const valorNumerico = parseFloat(valorEntrada.replace(/[^\d.]/g, "")) || 0;

    // Formatea el número como moneda en pesos mexicanos (MXN)
    const montoFormateado = new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(valorNumerico);

    console.log(importe);
    setActivoForm({
      ...activoForm,
      importe: valorNumerico,
    });
  };
  //load data
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
  useEffect(() => {
    console.log(
      "Información de cargas iniciales prov, fabricante, grupos ",
      activoForm
    );

    // Llamada a la función para obtener datos cuando el componente se monta
    obtenerProveedores();
    obtenerGruposActivos();
    obtenerFabricantes();
  }, []);
  const Clasificaciones = ["PROPIOS", "ARRENDADOS"];
  const [proveedores, setProveedores] = useState([""]);
  const [gruposActivos, setGruposActivos] = useState([""]);
  const [fabricantes, setFabricantes] = useState([""]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Imprimir información de activoForm en la consola
    if (!fecha_compra || !fecha_ingreso) {
      setAlertaAbierta(true);
      return;
    }

      // Si no se ha seleccionado un nuevo archivo de imagen, mantener los datos actuales
  if (!activoForm.foto) {
    setActivoForm({ ...activoForm, imagen: activoSelected.foto });
  }

  // Si no se ha seleccionado un nuevo archivo de documento, mantener los datos actuales
  if (!activoForm.documento) {
    setActivoForm({ ...activoForm, doc: activoSelected.documento });
  }
  console.log("Información de activoForm:", activoForm);

    // console.error("Por favor, enviando form", activoForm);
    handlerAddActivo(activoForm);

    // Limpiar los valores del formulario después del envío
    setActivoForm(initialActivoForm);
  };

  const onCloseForm = () => {
    handlerCloseForm();
    setActivoForm(initialActivoForm);
  };

  const [values, setValues] = React.useState({
    textmask: "(100) 000-0000",
    numberformat: "1320",
  });
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
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
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="nombre"
                label="Nombre"
                name="nombre"
                autoComplete="Nombre"
                value={nombre}
                autoFocus
                onChange={onInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="outlined-multiline-static"
                label="Descripcion/Observaciones"
                name="descripcion"
                multiline
                maxRows={3}
                autoComplete="Descripcion"
                value={descripcion}
                onChange={onInputChange}
              />
            </Grid>
            <Grid item xs={12} md={4} >
              <Autocomplete
                id="combo-box-fabricantes"
                options={fabricantes}
                getOptionLabel={(option) => option?.nombre || ""}
                style={{ width: "100%" }}
                value={
                  fabricantes.find(
                    (fab) => fab.fabricante_id === fabricante_id
                  ) || null
                }
                onChange={(event, newValue) =>
                  onInputChangeCombo(event, newValue, "fabricante")
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Fabricante/marca"
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            {/* <Grid item xs={4}>
              <FormControl fullWidth required>
                <InputLabel>Fabricante/Marca</InputLabel>
                <Select
                  value={fabricante_id}
                  onChange={onInputChange}
                  name="fabricante_id"
                >
                  {fabricantes.map((o) => (
                    <MenuItem key={o.fabricante_id} value={o.fabricante_id}>
                      {o.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid> */}

            <Grid item xs={4}>
              <TextField
                required
                fullWidth
                id="modelo"
                label="Modelo"
                name="modelo"
                autoComplete="modelo"
                value={modelo}
                onChange={onInputChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                autoComplete="given-serie"
                name="no_serie"
                required
                fullWidth
                id="no_serie"
                label="No. de Serie"
                value={no_serie}
                onChange={onInputChange}
              />
            </Grid>
            <Grid item xs={12} md={4} >
              <Autocomplete
                id="combo-box-proveedor"
                options={proveedores}
                getOptionLabel={(option) => option?.nombre || ""}
                style={{ width: "100%" }}
                value={
                  proveedores.find(
                    (prov) => prov.proveedor_id === proveedor_id
                  ) || null
                }
                onChange={(event, newValue) =>
                  onInputChangeCombo(event, newValue, "proveedor")
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Selecciona un proveedor"
                    variant="outlined"
                  />
                )}
              />
            </Grid>
           
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth required>
                <InputLabel>Clasificacion</InputLabel>
                
                <Select
                  value={clasificacion}
                  onChange={onInputChange}
                  name="clasificacion"
                  required
                >
                  {Clasificaciones.map((tipo) => (
                    <MenuItem key={tipo} value={tipo}>
                      {tipo}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4} >
              <Autocomplete
                id="combo-box-grupo"
                options={gruposActivos}
                getOptionLabel={(option) => option?.nombre || ""}
                style={{ width: "100%" }}
                value={
                  gruposActivos.find(
                    (op) => op.grupoactivo_id === grupoactivo_id
                  ) || null
                }
                onChange={(event, newValue) =>
                  onInputChangeCombo(event, newValue, "grupoactivo")
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Grupo de Activos"
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                fullWidth
                id="clave_busqueda"
                label="Codigo"
                name="clave_busqueda"
                autoComplete="clave_busqueda"
                value={clave_busqueda}
                onChange={onInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                fullWidth
                id="factura"
                label="Factura"
                name="factura"
                autoComplete="factura"
                value={factura}
                onChange={onInputChange}
              />
            </Grid>

            <Grid item xs={4} md={4}>
              <TextField
                label="Importe"
                value={importe}
                onChange={manejarCambio}
                name="Importe"
                id="importe"
                InputProps={{
                  inputComponent: NumericFormatCustom,
                }}
                variant="standard"
              />
            </Grid>
            <Grid item xs={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Fecha de Compra"
                  id="fechaCompra"
                  value={fecha_compra}
                  onChange={(date) => handleFechaChange(date, "fecha_compra")}
                  //onChange={(date) => setFechaCompra(date)}
                  //renderInput={(params) => <TextField {...params} required />}
                  slotProps={{ textField: { variant: "outlined" } }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={4}>
              {" "}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                {" "}
                <DatePicker
                  label="Fecha de Inicio de Uso"
                  id="fechaInicioUso"
                  value={fecha_ingreso}
                  onChange={(date) => handleFechaChange(date, "fecha_ingreso")}
                  inputVariant="outlined"
                  clearable
                  clearLabel="Limpiar fecha"
                  okLabel="Aceptar"
                  cancelLabel="Cancelar"
                  todayLabel="Hoy"
                  slotProps={{ textField: { variant: "outlined" } }}
                />{" "}
              </LocalizationProvider>{" "}
            </Grid>
            <Grid item xs={12} sm={4}></Grid>

           
            <Grid item xs={12} sm={4}>
              <Button
                component="label"
                variant="contained"
                color="success"
                sx={{
                  marginTop: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%", // Ajusta el ancho del Box al 100% de la columna
                  fontSize: "9px",

                }}
                startIcon={<CloudUploadIcon />}
              >
                {foto ? foto : "Cargar imagen"}
                <VisuallyHiddenInput
                  type="file"
                  accept="image/*"
                  //onChange={(e) => setImagen(e.target.files[0])}
                  onChange={manejarCambioImagen}
                  required={!foto}
                />
              </Button>
              <Snackbar
                open={alertaAbierta}
                autoHideDuration={6000}
                onClose={handleCerrarAlerta}
                message="Fecha de compra e inicio de uso es requerida."
              ></Snackbar>
            </Grid>
            <Grid item xs={4} md={4}>
              <Button
                component="label"
                variant="contained"
                color="success"
                sx={{
                  marginTop: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%", // Ajusta el ancho del Box al 100% de la columna
                  fontSize: "9px",
                }}
                startIcon={<NoteAddIcon />}
              >
                {documento ? documento : "Cargar Documento"}
                <VisuallyHiddenInput
                  type="file"
                  accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.pdf,application/pdf"
                  onChange={manejarCambioDocumento}
                  required={!documento}
                />
              </Button>
            </Grid>
            <Grid item xs={4} md={4}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  marginTop: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%", // Ajusta el ancho del Box al 100% de la columna
                  fontSize: "9px",

                }}
                startIcon={<SaveSharpIcon />}
              >
                GUARDAR
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};
