import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Fab,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MovimientosRow from "./MovimientosRow"; // Ajusta la importación según la estructura de tu proyecto

export const MovimientosList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { movimientos } = useSelector(
    (state) => state.movimientos
  ); // Ajusta según la estructura de tu estado en Redux

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchColumns = ["descripcion", "tipo_movimiento", "id_departamento"]; // Columnas en las que se realizará la búsqueda

  const filteredMovimientos = movimientos.filter((movimiento) =>
    searchColumns.some((column) =>
      movimiento[column]
        ?.toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
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

      {/* Botón para abrir el formulario de registro */}
      <NavLink to="/AssignAsset/process">
        <Fab
          color="primary"
          aria-label="add"
          style={{ marginLeft: "10px", marginTop: "25px" }}
        >
          <AddIcon />
        </Fab>
      </NavLink>

      <TableContainer
        component={Paper}
        style={{
          marginTop: "10px",
          overflowX: "auto",
        }}
      >
        <Table aria-label="collapsible table">
          <TableHead style={{ backgroundColor: "#000" }}>
            <TableRow>
              <TableCell style={{ color: "#fff", fontWeight: "bold" }}>
                ID
              </TableCell>
              <TableCell
                style={{ color: "#fff", fontWeight: "bold" }}
                align="center"
              >
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
          <TableBody>
            {filteredMovimientos.map((movimiento) => (
              <MovimientosRow
                key={movimiento.id}
                movimiento={movimiento}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
