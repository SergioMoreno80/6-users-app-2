import React, { useState } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

export const FormularioEjemplo = () => {
  const [productos, setProductos] = useState([
    {
      id: 1,
      nombre: 'Producto 1',
      descripcion: 'Descripción del Producto 1',
      imagen: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      nombre: 'Producto 2',
      descripcion: 'Descripción del Producto 2',
      imagen: 'https://via.placeholder.com/150',
    },
    // Agregar más productos según sea necesario
  ]);

  return (
    <Grid container justifyContent="center">
      <Grid item xs={10}>
        <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
          <Typography variant="h5" align="center">
            Lista de Productos en Tabla
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Imagen</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Descripción</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productos.map((producto) => (
                  <TableRow key={producto.id}>
                    <TableCell>{producto.id}</TableCell>
                    <TableCell>
                      <img src={producto.imagen} alt={producto.nombre} style={{ width: '50px' }} />
                    </TableCell>
                    <TableCell>{producto.nombre}</TableCell>
                    <TableCell>{producto.descripcion}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </Grid>
  );
};

