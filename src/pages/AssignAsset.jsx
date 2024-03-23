import { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import PlaylistAddCircleIcon from "@mui/icons-material/PlaylistAddCircle";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { useAuth } from "../auth/hooks/useAuth";

import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  Table,
  TableBody,
  MenuItem,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Box from "@mui/material/Box";
import { EngineeringOutlined } from "@mui/icons-material";
import { useEmpleados } from "../hooks/useEmpleados";
import { useDepartamentos } from "../hooks/useDepartamentos";
import { useSucursales } from "../hooks/useSucursales";
import { useMovimientos } from "../hooks/useMovimientos";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useActivos } from "../hooks/useActivos";
import { styled } from "@mui/material/styles";

// Componente Producto
function Activo({ nombre, precio, onAgregar }) {
  return (
    <div>
      <span>
        {nombre} - ${precio}
      </span>
      <button onClick={onAgregar}>Agregar</button>
    </div>
  );
}

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

export const AssignAsset = () => {
  //const { empleados } = useEmpleados(); //inicializar forma
  const { login, handlerLogout } = useAuth();

  const { empleados, isLoading, errors, getEmpleados } = useEmpleados();
  const { sucursales, getSucursales } = useSucursales();
  const { departamentos, getDepartamentos } = useDepartamentos();
  const { activos, getList } = useActivos();
  const [selectedActivo, setSelectedActivo] = useState("");
  const { initialMovimientoForm, initialDetalleForm, handlerAddMovimiento } =
    useMovimientos(); //inicializar forma

  const [movimientoForm, setMovimientoForm] = useState(initialMovimientoForm);
  // const [detalleForm, setDetalleForm] = useState([initialDetalleForm]); // Inicializar como un array
  const [detalleForm, setDetalleForm] = useState([]);

  ////pruebas
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState([]);
  
  const {
    tipo_movimiento,
    fecha_movimiento,
    descripcion,
    id_sucursal,
    id_departamento,
    user_id,
    empleado_id,
    doc,
  } = movimientoForm;

  const {
    // movimiento_id,
    activo_id,
    cantidad,
  } = detalleForm;

  useEffect(() => {
    getEmpleados();
    getSucursales();
    getDepartamentos();
    getList();
  }, []);

  const onInputChange = ({ target }) => {
    console.log(target.value);
    console.log(target.name);
    const { name, value } = target;
    setMovimientoForm({
      ...movimientoForm,
      [name]: value,
    });
  };

  const handleFechaChange = (date, name) => {
    // Actualizar el estado con la nueva fecha
    console.log(name);
    console.log(date);
    setMovimientoForm({
      ...movimientoForm,
      [name]: date,
    });
  };

  const Movimiento = ["Asignacion", "Baja", "Prestamo", "Transferencia"];
  const [activosUtilizados, setActivosUtilizados] = useState([]);

  // Función para agregar un detalle de activo
  const handleAgregarDetalle = () => {
    if (selectedActivo && !activosUtilizados.includes(selectedActivo)) {
      setDetalleForm([...detalleForm, selectedActivo]);
      setActivosUtilizados([...activosUtilizados, selectedActivo]);
      setSelectedActivo(null);

      console.log("entro detalleForm: ",detalleForm);
      console.log("entro selectedActivo : ",selectedActivo);
      console.log("entro activosUtilizados: ",activosUtilizados);
    }
    
  };

  // Función para eliminar un detalle de activo
  const handleEliminarProducto = (index) => {
    const nuevosDetalles = [...detalleForm];
    nuevosDetalles.splice(index, 1);
    setDetalleForm(nuevosDetalles);
  };

  const manejarCambioDocumento = (e) => {
    const archivo = e.target.files[0];
    //setImagen(archivoImagen);
    console.log(archivo)
    setMovimientoForm({
      ...movimientoForm,
      doc: archivo,
    });
    console.log(movimientoForm);

  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  // Imprimir información de activoForm en la consola


  if (!fecha_movimiento) {
    alert("Por favor, selecciona una fecha");
    return;
  }
  if (detalleForm.length === 0) {
    alert("Por favor, selecciona al menos un activo");
    return;
  }
      console.log('Información de movimientoForm:', movimientoForm);
      console.log('INFO de los detalle de detalleForm:  ', detalleForm);
    //return;
    handlerAddMovimiento(movimientoForm, detalleForm);
    
  };

  if (isLoading) {
    return <p>Cargando empleados...</p>;
  }

  if (errors) {
    return (
      <div>
        <p>Error al cargar empleados: {error}</p>
        <button onClick={handleClickReload}>Intentar nuevamente</button>
      </div>
    );
  }
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
          <EngineeringOutlined color="warning" />
          <Typography variant="h6">Movimiento de Activos</Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={6} md={6} marginTop={2}>
              <FormControl fullWidth>
                <InputLabel>Personal</InputLabel>
                <Select
                  value={empleado_id}
                  onChange={onInputChange}
                  name="empleado_id"
                  required
                  autoFocus
                >
                  {empleados &&
                    empleados.map((employee) => (
                      <MenuItem
                        key={employee.empleado_id}
                        value={employee.empleado_id}
                      >
                        {employee.nombre}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} marginTop={2}>
              <FormControl fullWidth>
                <InputLabel>Movimiento</InputLabel>
                <Select
                  value={tipo_movimiento}
                  onChange={onInputChange}
                  name="tipo_movimiento"
                  required
                >
                  {Movimiento.map((tipo) => (
                    <MenuItem key={tipo} value={tipo}>
                      {tipo}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} marginTop={2}>
              <FormControl fullWidth>
                <InputLabel>Sucursal</InputLabel>
                <Select
                  value={id_sucursal}
                  onChange={onInputChange}
                  name="id_sucursal"
                  required
                >
                  {sucursales &&
                    sucursales.map((sucursal) => (
                      <MenuItem key={sucursal.id} value={sucursal.id}>
                        {sucursal.nombre}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} marginTop={2}>
              <FormControl fullWidth>
                <InputLabel>Departamento</InputLabel>
                <Select
                  value={id_departamento}
                  onChange={onInputChange}
                  name="id_departamento"
                  required
                >
                  <MenuItem value="">Seleccionar departamento</MenuItem>
                  {departamentos &&
                    departamentos.map((departamento) => (
                      <MenuItem key={departamento.id} value={departamento.id}>
                        {departamento.nombre}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
          

            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                label="Descripción del Movimiento"
                name="descripcion"
                multiline
                rows={3}
                value={descripcion}
                onChange={onInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Fecha"
                  value={fecha_movimiento}
                  
                  required
                  onChange={(date) =>
                    handleFechaChange(date, "fecha_movimiento")
                  }
                  sx={{ width: "100%" }}
                  // renderInput={(params) => <TextField {...params} />}
                  // slotProps={{ textField: { variant: 'outlined' } }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6} md={6}  >
              <Button
                component="label"
                variant="contained"
                color="primary"
                sx={{
                  marginTop: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%", // Ajusta el ancho del Box al 100% de la columna
                }}
                startIcon={<PlaylistAddCircleIcon />}
              >
                CARGAR DOCUMENTO
                <VisuallyHiddenInput
                  type="file"
                  //accept="image/*"
                  accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.pdf,application/pdf"

                  //onChange={(e) => setImagen(e.target.files[0])}
                  onChange={manejarCambioDocumento}
                />
              </Button>
   
            </Grid>

            <Grid item xs={12}>
              <Box
                sx={{
                  marginTop: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%", // Ajusta el ancho del Box al 100% de la columna
                }}
                p={2}
                textAlign="center"
                bgcolor="#0E0E2C"
                color="white"
              >
                <Typography variant="h6">
                  Selecciona y agrega activos
                </Typography>
                <PlaylistAddCircleIcon color="primary" />
              </Box>
            </Grid>
            <Grid item xs={12} md={6} marginTop={2}>
              <Autocomplete
                id="combo-box-demo"
                options={activos}
                getOptionLabel={(option) => option?.nombre || ""}
                style={{ width: "100%" }}
                value={selectedActivo || null} // Cambiar a null en lugar de ""
                onChange={(event, newValue) => {
                  setSelectedActivo(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Selecciona un activo"
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6} marginTop={2}>
              <Fab
                color="primary"
                aria-label="add"
                onClick={handleAgregarDetalle}
                disabled={!selectedActivo}
              >
                <AddIcon />
              </Fab>
            </Grid>

            <Grid item xs={12}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Activo</TableCell>
                      <TableCell>Modelo(SKU)</TableCell>
                      <TableCell>NO. SERIE</TableCell>
                      <TableCell>Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {detalleForm.map((detalle, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <TextField
                            fullWidth
                            value={detalle.nombre}
                            variant="standard"
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            fullWidth
                            value={detalle.modelo}
                            variant="standard"
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            fullWidth
                            value={detalle.no_serie}
                            variant="standard"
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Fab
                            color="error"
                            aria-label="add"
                            onClick={() => handleEliminarProducto(index)}
                          >
                            <RemoveIcon />
                          </Fab>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            <Grid item xs={12}>
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
