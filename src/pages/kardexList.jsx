import { MovimientosKardex } from "../components/MovimientosKardex";
import { useMovimientos } from "../hooks/useMovimientos";
import { useAuth } from "../auth/hooks/useAuth";
import React, { useState } from "react";
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
export const KardexList = ({ activo }) => {


  const [isTableExpanded, setTableExpanded] = useState(true);

  const toggleTableSize = () => {
    setTableExpanded(!isTableExpanded);
  };
  const { movimientos } = useMovimientos();
  const { login } = useAuth();
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
          </TableRow>
        </TableHead>
        <TableBody>
          {
                movimientos.map(({ //imagen, 
                  id, tipo_movimiento, fecha_movimiento, descripcion, id_sucursal, id_departamento, empleado_id }) => (
                    <MovimientosKardex
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
        </TableBody>
      </Table>
    </TableContainer>
  );
};

