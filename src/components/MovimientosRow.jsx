import { NavLink } from "react-router-dom";
import { useMovimientos } from "../hooks/useMovimientos";
import { useAuth } from "../auth/hooks/useAuth";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { format } from "date-fns";
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import pc from "../images/pc escritorio.webp"; // Ajusta la ruta a tu imagen de logotipo

export const MovimientosRow = ({
  id,
  tipo_movimiento,
  fecha_movimiento,
  descripcion,
  id_sucursal,
  id_departamento,
  empleado_id,
}) => {
  const { handlerMovimientoSelectedForm, handlerRemoveMovimiento } =
    useMovimientos();
  const { login } = useAuth();
  const [open, setOpen] = React.useState(false);

  const handleGeneratePDF = () => {
    // Renderizar el contenido de la fila en un lienzo HTML
    console.log("crea PDF");
//testing code fr error at line 57

const pdf = new jsPDF();
pdf.text('Movimiento de activo', 70,20);

const columnas = ["id", "fecha", "descripcion", "id_sucursal", "id_departamento"];

const datos = [
  [id, formattedDate, descripcion, id_sucursal, id_departamento]
  // Agrega más filas aquí si es necesario
];

pdf.autoTable({ startY: 30, columns: columnas, body: datos });
pdf.save('movimiento_'.concat(id).concat('.pdf'));



  };
  // Convertir la cadena a un objeto Date
  const dateObject = new Date(fecha_movimiento);

  // Dar formato a la fecha utilizando date-fns
  const formattedDate = format(dateObject, "dd/MM/yyyy");

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
 
 
        <TableCell align="center">{id}</TableCell>

        <TableCell component="th" scope="row" align="center">
          {tipo_movimiento}
        </TableCell>

        <TableCell align="center">{formattedDate}</TableCell>
        <TableCell align="center">{descripcion}</TableCell>
        <TableCell align="center">{id_sucursal}</TableCell>
        <TableCell align="center">{id_departamento}</TableCell>

        <TableCell align="center">{empleado_id}</TableCell>
        <TableCell align="center">
          <Button
            component="label"
            variant="contained"
            color="primary"
            onClick={handleGeneratePDF}
          
            sx={{
              marginTop: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%", // Ajusta el ancho del Box al 100% de la columna
            }}
            startIcon={<PictureAsPdfIcon />}
          ></Button>
        </TableCell>
      </TableRow>

    </React.Fragment>
  );
};
