import { MovimientosRow } from "./MovimientosRow";
import { useMovimientos } from "../hooks/useMovimientos";
import { useAuth } from "../auth/hooks/useAuth";
import React, { useState } from "react";
import { NavLink } from "react-router-dom"; // Importa NavLink
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField, Fab
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export const MovimientosList = () => {
  const [isTableExpanded, setTableExpanded] = useState(true);
  const { movimientos } = useMovimientos();
  const { login } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const searchColumns = ['descripcion', 'tipo_movimiento', 'id_departamento']; // Columnas en las que se realizará la búsqueda

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredMovimientos = movimientos.filter((mov) =>
    searchColumns.some((column) =>
      mov[column]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
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
              <TableCell style={{ color: "#fff", fontWeight: "bold" }} align="center">
                TIPO DE MOVIMIENTO
              </TableCell>
              <TableCell style={{ color: "#fff", fontWeight: "bold" }} align="center">
                FECHA DE MOVIMIENTO
              </TableCell>
              <TableCell style={{ color: "#fff", fontWeight: "bold" }} align="center">
                DESCRIPCION
              </TableCell>
              <TableCell style={{ color: "#fff", fontWeight: "bold" }} align="center">
                SUCURSAL
              </TableCell>
              <TableCell style={{ color: "#fff", fontWeight: "bold" }} align="center">
                DEPARTAMENTO
              </TableCell>
              <TableCell style={{ color: "#fff", fontWeight: "bold" }} align="center">
                PERSONAL
              </TableCell>
              <TableCell style={{ color: "#fff", fontWeight: "bold" }} align="center">
                PDF
              </TableCell>
            </TableRow>
          </TableHead>
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
