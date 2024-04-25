import { MovimientosRow } from "./MovimientosRow";
import { useMovimientos } from "../hooks/useMovimientos";
import { useAuth } from "../auth/hooks/useAuth";
import React, { useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MenuIcon from "@mui/icons-material/Menu";
import estantes from "../images/estantes.jpeg"; // Ajusta la ruta a tu imagen de logotipo
import laptop from "../images/laptop.jpeg"; // Ajusta la ruta a tu imagen de logotipo
import konica from "../images/konica.jpeg"; // Ajusta la ruta a tu imagen de logotipo
import pc from "../images/pc escritorio.webp"; // Ajusta la ruta a tu imagen de logotipo
import chevy from "../images/chevrolet.jpeg"; // Ajusta la ruta a tu imagen de logotipo
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
} from "@mui/material";

export const MovimientosList = () => {
  const [isTableExpanded, setTableExpanded] = useState(true);

  const toggleTableSize = () => {
    setTableExpanded(!isTableExpanded);
  };
  const { movimientos } = useMovimientos();
  const { login } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const searchColumns = ['descripcion', 'tipo_movimiento', 'id_departamento']; // Columnas en las que se realizará la búsqueda

  const handleSearchTermChange = (event) => {
    console.log("", event.target.value);
    setSearchTerm(event.target.value);
  };


  const filteredMovimientos = movimientos.filter((mov) =>
  searchColumns.some((column) =>
    mov[column].toString().toLowerCase().includes(searchTerm.toLowerCase())
  )
);
  return (

    <div style={{ margin: "20px", maxHeight: "700px", overflow: "auto" }}>

    <TextField
      label="Buscar movimiento"
      variant="outlined"
      value={searchTerm}
      onChange={handleSearchTermChange}
      fullWidth
      margin="normal"
      sx={{ maxWidth: "400px" }}
    />

    <TableContainer
      component={Paper}
      style={{
        marginLeft: isTableExpanded ? "40px" : "40",
        marginTop: "10px",
        transition: "margin-left 0.3s ease-in-out",
        overflowX: "auto",
      }}
    >
      <Table aria-label="collapsible table">
        <TableHead style={{ backgroundColor: "#000" }}>
          <TableRow>
            <TableCell style={{ color: "#fff", fontWeight: "bold" }}>
              ID
            </TableCell>
            <TableCell style={{ color: "#fff", fontWeight: "bold" }}
            align="center">
              TIPO DE MOVIMIENTO
            </TableCell>
            <TableCell
              style={{ color: "#fff", fontWeight: "bold" }}
              align="center"
            >
              FECHA DE MOVIMIENTO
            </TableCell>
            <TableCell
              style={{ color: "#fff", fontWeight: "bold" }}
              align="center"
            >
              DESCRIPCION
            </TableCell>
            <TableCell
              style={{ color: "#fff", fontWeight: "bold" }}
              align="center"
            >
              SUCURSAL
            </TableCell>
            <TableCell
              style={{ color: "#fff", fontWeight: "bold" }}
              align="center"
            >
              DEPARTAMENTO
            </TableCell>
            <TableCell
              style={{ color: "#fff", fontWeight: "bold" }}
              align="center"
            >
              PERSONAL
            </TableCell>
            <TableCell
              style={{ color: "#fff", fontWeight: "bold" }}
              align="center"
            >
              PDF
            </TableCell>
          </TableRow>
        </TableHead>
        {/* <TableBody>
          {
                movimientos.map(({ //imagen, 
                  id, tipo_movimiento, fecha_movimiento, descripcion, id_sucursal, id_departamento, empleado_id }) => (
                    <MovimientosRow
                        key={id}
                        id={id}
                        //imagen={imagen}
                        tipo_movimiento={tipo_movimiento}
                        fecha_movimiento={fecha_movimiento}
                        descripcion={descripcion}
                        id_sucursal={id_sucursal}
                        id_departamento={id_departamento}
                        empleado_id={empleado_id}
                    />
                ))
            }
           
        </TableBody> */}
        <TableBody>
            {filteredMovimientos.map((mov) => (
              <MovimientosRow key={mov.id} {...mov} />
            ))}
          </TableBody>
      </Table>

    </TableContainer>
    </div>
  );
};
