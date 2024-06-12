import { useEffect } from "react";
import { useMovimientos } from "../hooks/useMovimientos";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { MovimientosKardex } from "../components/MovimientosKardex";

export const KardexList = ({ movimientos }) => {

  return (
    <TableContainer
      component={Paper}
      style={{
        marginLeft: "40px",
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
          </TableRow>
        </TableHead>
        <TableBody>
          {movimientos.map(({ id, tipo_movimiento, fecha_movimiento, descripcion, sucursales, departamentos, empleado }) => (
            <MovimientosKardex
              key={id}
              id={id}
              tipo_movimiento={tipo_movimiento}
              fecha_movimiento={fecha_movimiento}
              descripcion={descripcion}
              id_sucursal={sucursales?.nombre}
              id_departamento={departamentos?.nombre}
              empleado_id={empleado?.nombre} 
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};