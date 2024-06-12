import React, { useState } from "react";
import { format } from "date-fns";
import { useMovimientos } from "../hooks/useMovimientos";
import { useAuth } from "../auth/hooks/useAuth";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import {
  TableCell,
  TableRow,
  IconButton,
} from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

export const MovimientosKardex = ({
  id,
  tipo_movimiento,
  fecha_movimiento,
  descripcion,
  id_sucursal,
  id_departamento,
  empleado_id,
}) => {
  
  const { handlerMovimientoSelectedForm, handlerRemoveMovimiento } = useMovimientos();
  const { login } = useAuth();
  const [open, setOpen] = useState(false);

  const handleGeneratePDF = () => {
    const pdf = new jsPDF();
    pdf.text('Movimiento de activo', 70, 20);

    const columnas = ["ID", "Fecha", "Descripción", "Sucursal", "Departamento"];
    const datos = [[id, fecha_movimiento, descripcion, id_sucursal, id_departamento]];

    pdf.autoTable({ startY: 30, columns: columnas, body: datos });
    pdf.save(`movimiento_${id}.pdf`);
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
        {/* <TableCell align="center">
          <IconButton
            onClick={handleGeneratePDF}
            aria-label="generate-pdf"
            color="primary"
          >
            <PictureAsPdfIcon />
          </IconButton>
        </TableCell> */}
      </TableRow>
    </React.Fragment>
  );
};

export default MovimientosKardex;
