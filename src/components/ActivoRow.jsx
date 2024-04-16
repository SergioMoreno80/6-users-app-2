import { NavLink } from "react-router-dom";
import { useActivos } from "../hooks/useActivos";
import { useAuth } from "../auth/hooks/useAuth";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { format } from "date-fns";
import Fab from "@mui/material/Fab";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import RemoveIcon from "@mui/icons-material/Remove";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

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

export const ActivoRow = ({
  imagen,
  activo_id,
  nombre,
  descripcion,
  factura,
  fecha_compra,
  no_serie,
  modelo,
  importe,
  proveedor_id,
  estatus,
  foto,
  proveedor,
}) => {
  const { handlerActivoSelectedForm, handlerRemoveActivo } = useActivos();
  const { login } = useAuth();
  const [open, setOpen] = React.useState(false);
  const formattedCurrency = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "MXN", // Puedes ajustar la moneda según tus necesidades
    minimumFractionDigits: 2,
  }).format(importe);

  const handleGeneratePDF = () => {
    // Renderizar el contenido de la fila en un lienzo HTML
    console.log("crea PDF");
    //testing code fr error at line 57

    const pdf = new jsPDF();
    pdf.text("Activos", 70, 20);

    const columnas = [
      "ID",

      "FECHA_COMPRA",
      "DESCRIPCION",
      "PROVEEDOR",
      "FACTURA",
    ];

    const datos = [
      [activo_id, formattedDate, descripcion, proveedor, factura],
      // Agrega más filas aquí si es necesario
    ];

    pdf.autoTable({ startY: 30, columns: columnas, body: datos });
    pdf.save("activos_".concat(id).concat(".pdf"));
  };

  // Convertir la cadena a un objeto Date
  const dateObject = new Date(fecha_compra);

  // Dar formato a la fecha utilizando date-fns
  const formattedDate = format(dateObject, "dd/MM/yyyy");
  //      <TableCell>{formattedDate}</TableCell>

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        {/* <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell> */}
        <TableCell>
          {/* <img
            src={`http://localhost:8080/imagenes/${foto}`}
            alt={foto}
            style={{ width: "50px" }}
          /> */}
          <NavLink to={`/Assets/kardex/${activo_id}`}>
            <img
              src={`http://localhost:8080/imagenes/${foto}`}
              alt={foto}
              style={{ width: "50px" }}
            />
          </NavLink>
        </TableCell>

        <TableCell component="th" scope="row" align="left">
          {nombre}
        </TableCell>

        <TableCell align="center">{factura}</TableCell>
        <TableCell align="center">{formattedDate}</TableCell>
        <TableCell align="center">{formattedCurrency}</TableCell>
        <TableCell align="center">{proveedor}</TableCell>
        {/* <TableCell align="center">
          <NavLink to={"/Assets/edit/" + id}>
            <Fab>
              <EditRoundedIcon />
            </Fab>
          </NavLink>
        </TableCell> */}
        <TableCell align="center">
          <Fab
            color="error"
            aria-label="add"
            onClick={() => handlerRemoveActivo(id)}
          >
            <RemoveIcon />
          </Fab>
        </TableCell>
        <TableCell align="center">
          <Fab color="primary" aria-label="add" onClick={handleGeneratePDF}>
            <PictureAsPdfIcon />
          </Fab>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};
