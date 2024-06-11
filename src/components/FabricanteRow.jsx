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
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import JsBarcode from 'react-jsbarcode';
import jsPDF from "jspdf";
import "jspdf-autotable";
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
import { useMarcas } from "../hooks/useMarcas";

export const FabricanteRow = ({
  fabricante_id,
  nombre,
  descripcion,
  estatus,
  clave_busqueda
}) => {
  const { handlerFabricanteSelectedForm, handlerRemoveFabricante } = useMarcas();
  const { login } = useAuth();
  const [open, setOpen] = React.useState(false);
 

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
      [activo_id, formattedDate, descripcion, fabricante, factura],
      // Agrega más filas aquí si es necesario
    ];

    pdf.autoTable({ startY: 30, columns: columnas, body: datos });
    pdf.save("activos_".concat(activo_id).concat(".pdf"));
  };


  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row" align="left">
          {nombre}
        </TableCell>
        <TableCell align="left">{descripcion}</TableCell>
        <TableCell align="center">{estatus}</TableCell>

        <TableCell align="center">
          <NavLink to={"/fabricantes/edit/" + fabricante_id}>
            <Fab>
              <EditRoundedIcon />
            </Fab>
          </NavLink>
        </TableCell>
        {/* <TableCell align="center">
          <Fab
            color="error"
            aria-label="add"
            onClick={() => handlerRemoveProveedor(proveedor_id)}
          >
            <RemoveIcon />
          </Fab>
        </TableCell> */}

      </TableRow>
    </React.Fragment>
  );
};
