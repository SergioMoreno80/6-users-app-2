import { ActivoRow } from "./ActivoRow";
import { useActivos } from "../hooks/useActivos";
import { useAuth } from "../auth/hooks/useAuth";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MenuIcon from "@mui/icons-material/Menu";

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

export const ActivosList = () => {
  const [isTableExpanded, setTableExpanded] = useState(true);

  const toggleTableSize = () => {
    setTableExpanded(!isTableExpanded);
  };
  const { activos } = useActivos();
  const [searchTerm, setSearchTerm] = useState("");
  const { login } = useAuth();
  const searchColumns = ['nombre', 'proveedor', 'factura']; // Columnas en las que se realizará la búsqueda

  const handleSearchTermChange = (event) => {
    console.log("", event.target.value);
    setSearchTerm(event.target.value);
  };


  const filteredActivos = activos.filter((activo) =>
  searchColumns.some((column) =>
    activo[column].toString().toLowerCase().includes(searchTerm.toLowerCase())
  )
);



  return (
  <div style={{ margin: "20px", maxHeight: "700px", overflow: "auto" }}>

      <TextField
        label="Buscar activo"
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
              <TableCell
                style={{ color: "#fff", fontWeight: "bold" }}
                align="center"
              >
                IMG
              </TableCell>
              <TableCell style={{ color: "#fff", fontWeight: "bold" }}>
                NOMBRE
              </TableCell>
              <TableCell
                style={{ color: "#fff", fontWeight: "bold" }}
                align="center"
              >
                FACTURA
              </TableCell>
              <TableCell
                style={{ color: "#fff", fontWeight: "bold" }}
                align="center"
              >
                FECHA DE COMPRA
              </TableCell>
              <TableCell
                style={{ color: "#fff", fontWeight: "bold" }}
                align="center"
              >
                COSTO
              </TableCell>
              <TableCell
                style={{ color: "#fff", fontWeight: "bold" }}
                align="center"
              >
                PROVEEDOR
              </TableCell>
              {/* <TableCell
              style={{ color: "#fff", fontWeight: "bold" }}
              align="center"
            >
              EDITAR
            </TableCell> */}
              <TableCell
                style={{ color: "#fff", fontWeight: "bold" }}
                align="center"
              >
                ELIMINAR
              </TableCell>
              <TableCell
                style={{ color: "#fff", fontWeight: "bold" }}
                align="center"
              >
                PDF
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredActivos.map((activo) => (
              <ActivoRow key={activo.activo_id} {...activo} />
            ))}
          </TableBody>
          {/* <TableBody>
           
            {activos.map(
              ({
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
              }) => (
                <ActivoRow
                  key={activo_id}
                  id={activo_id}
                  nombre={nombre}
                  descripcion={descripcion}
                  factura={factura}
                  fecha_compra={fecha_compra}
                  no_serie={no_serie}
                  modelo={modelo}
                  importe={importe}
                  proveedor_id={proveedor_id}
                  estatus={estatus}
                  foto={foto}
                  proveedor={proveedor}
                />
              )
            )}
          </TableBody> */}
        </Table>
        <IconButton
          onClick={toggleTableSize}
          style={{ position: "absolute", top: "8px", left: "8px", zIndex: 1 }}
        >
          <MenuIcon />
        </IconButton>
      </TableContainer>
    </div>
  );
};
