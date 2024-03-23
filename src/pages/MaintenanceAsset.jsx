import React, { useState } from 'react';
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
} from '@mui/material';
import Box from '@mui/material/Box';
import HandymanIcon from '@mui/icons-material/Handyman';


const NumberFormatCustom = (props) => {
    const { inputRef, onChange, ...other } = props;
  
    return (
      <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator={true}
        prefix={'$'}
        decimalScale={2} // Opcional: número de decimales
      />
    );
  };

export const MaintenanceAsset = () => {

    const sucursales = ['Flosamed Central','Sucursal SLM', 'Sucursal Tampico', 'Sucursal Victoria-Satelite', 
    'Sucursal Victoria-HGral', 'Sucursal Victoria-LAPAZ'];
  const departamentos = ['Sin Departamento', 'Finanzas', 'Contabilidad', 'Recursos Humanos', 'Sistemas', 'Almacen', 'Logistica'];

  const [formData, setFormData] = useState({
    cliente: '',
    fecha: '',
    costo: 0,
    descripcion: '',
    sucursal: '',
    departamento: '',
    productos: [
      { id: 1, nombre: '', cantidad: 0, precio: 0 },
    ],
  });

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newProductos = [...formData.productos];
    newProductos[index] = {
      ...newProductos[index],
      [name]: value,
    };

    setFormData({
      ...formData,
      productos: newProductos,
    });
  };


  const handleAgregarProducto = () => {
    setFormData({
      ...formData,
      productos: [...formData.productos, { id: Date.now(), nombre: '', codigo: '', cantidad: 0, precio: 0 }],
    });
  };

  const handleEliminarProducto = (id) => {
    setFormData({
      ...formData,
      productos: formData.productos.filter((producto) => producto.id !== id),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Puedes realizar acciones adicionales con los datos del formulario aquí
    console.log(formData);
  };

  return (
    <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
    <Paper elevation={3} style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
    <Box p={2} textAlign="center" bgcolor="#0E0E2C" color="white">
    <HandymanIcon color="warning" />
          <Typography variant="h6">
   Mantenimiento de Activos</Typography>
        </Box>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} marginTop={2}>
            <TextField
              fullWidth
              label="Responsable"
              name="responsable"
              value={formData.cliente}
              onChange={(e) => setFormData({ ...formData, cliente: e.target.value })}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Fecha"
                type="date"
                name="fecha"
                value={formData.fecha}
                onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
              fullWidth
                label="Costo"
                type="number"
                name="costo"
                value={formData.costo}
                onChange={(e) => setFormData({ ...formData, costo: e.target.value })}
                required


                
            
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                label="Descripción del Movimiento"
                name="descripcion"
                multiline
                rows={3}
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Sucursal</InputLabel>
                <Select
                  value={formData.sucursal}
                  onChange={(e) => setFormData({ ...formData, sucursal: e.target.value })}
                >
                  {sucursales.map((sucursal) => (
                    <MenuItem key={sucursal} value={sucursal}>
                      {sucursal}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Departamento</InputLabel>
                <Select
                  value={formData.departamento}
                  onChange={(e) => setFormData({ ...formData, departamento: e.target.value })}
                >
                  {departamentos.map((departamento) => (
                    <MenuItem key={departamento} value={departamento}>
                      {departamento}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          <Grid item xs={12}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Activo</TableCell>
                    <TableCell>Codigo(SKU)</TableCell>
                    <TableCell>Cantidad</TableCell>
                    <TableCell>Precio</TableCell>
                    <TableCell>Acciones</TableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                  {formData.productos.map((producto, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <TextField
                          fullWidth
                          name="nombre"
                          value={producto.nombre}
                          onChange={(e) => handleChange(e, index)}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          fullWidth
                          name="codigo"
                          value={producto.codigo}
                          onChange={(e) => handleChange(e, index)}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          type="number"
                          name="cantidad"
                          value={producto.cantidad}
                          onChange={(e) => handleChange(e, index)}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          type="number"
                          name="precio"
                          value={producto.precio}
                          onChange={(e) => handleChange(e, index)}
                        />
                      </TableCell>
                      <TableCell>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => handleEliminarProducto(producto.id)}
                          >
                            Eliminar
                          </Button>
                        </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="success" onClick={handleAgregarProducto}>
              Agregar Producto
            </Button>

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

