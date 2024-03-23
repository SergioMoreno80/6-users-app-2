// Componente que utiliza Redux para cargar y mostrar datos con manejo de errores y paginación
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cargarDatos, cambiarPagina } from '../hooks/datosActions';
import { useAuth } from "../auth/hooks/useAuth";


import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

export const DatosComponent = () => {

//const DatosComponent = () => {
  const dispatch = useDispatch();
  const { lista, cargando, error, paginaActual, totalPaginas } = useSelector((state) => state.activos);

  const { login } = useAuth();

  useEffect(() => {
    dispatch(cargarDatos(paginaActual));
  }, [dispatch, paginaActual]);

  const handleCambiarPagina = (nuevaPagina) => {
    dispatch(cambiarPagina(nuevaPagina));
  };

  if (cargando) {
    return <p>Cargando datos...</p>;
  }

  if (error) {
    return <p>Error al cargar datos: {error}</p>;
  }

  return (
    <div>
      <h1>Datos desde el Backend</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              {/* Agrega más celdas para otros campos */}
            </TableRow>
          </TableHead>
          <TableBody>
            {lista.map((dato) => (
              <TableRow key={dato.id}>
                <TableCell>{dato.id}</TableCell>
                <TableCell>{dato.nombre}</TableCell>
                {/* Agrega más celdas para otros campos */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div>
        <p>Página {paginaActual} de {totalPaginas}</p>
        <Button onClick={() => handleCambiarPagina(paginaActual - 1)} disabled={paginaActual === 1}>
          Anterior
        </Button>
        <Button onClick={() => handleCambiarPagina(paginaActual + 1)} disabled={paginaActual === totalPaginas}>
          Siguiente
        </Button>
      </div>
    </div>
  );
};

