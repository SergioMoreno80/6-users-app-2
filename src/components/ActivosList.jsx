import { ActivoRow } from "./ActivoRow";
import { useActivos } from "../hooks/useActivos";
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
} from "@mui/material";

export const ActivosList = () => {
  const [isTableExpanded, setTableExpanded] = useState(true);

  const toggleTableSize = () => {
    setTableExpanded(!isTableExpanded);
  };
  const { activos } = useActivos();
  const { login } = useAuth();
  return (
    // <table className="table table-hover table-striped">

    //     <thead>
    //         <tr>
    //             <th>#</th>
    //             <th>nombre</th>
    //             <th>descripcion</th>
    //             {!login.isAdmin || <>
    //                 <th>update</th>
    //                 <th>update route</th>
    //                 <th>remove</th>
    //             </>}
    //         </tr>
    //     </thead>
    //     <tbody>
    //         {
    //             activos.map(({ activo_id, nombre, descripcion }) => (
    //                 <ActivoRow
    //                     key={activo_id}
    //                     id={activo_id}
    //                     nombre={nombre}
    //                     descripcion={descripcion}
    //                     //admin={admin}
    //                 />
    //             ))
    //         }
    //     </tbody>
    // </table>
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
            <TableCell />
            <TableCell style={{ color: "#fff", fontWeight: "bold" }}>
              Imagen
            </TableCell>
            <TableCell style={{ color: "#fff", fontWeight: "bold" }}>
              Nombre
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
            <TableCell
              style={{ color: "#fff", fontWeight: "bold" }}
              align="center"
            >
              ESTATUS
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        
              {/* {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))} */}
          {
                activos.map(({ //imagen, 
                  activo_id, nombre, descripcion, factura, fecha_compra, no_serie, modelo, importe, proveedor_id, estatus }) => (
                    <ActivoRow
                        key={activo_id}
                        id={activo_id}
                        //imagen={imagen}
                        nombre={nombre}
                        descripcion={descripcion}
                        factura={factura}
                        fecha_compra={fecha_compra}
                        no_serie={no_serie}
                        modelo={modelo}
                        importe={importe}
                        proveedor_id={proveedor_id}
                        estatus={estatus}
                    />
                ))
            }
           
        </TableBody>
      </Table>
      <IconButton
        onClick={toggleTableSize}
        style={{ position: "absolute", top: "8px", left: "8px", zIndex: 1 }}
      >
        <MenuIcon />
      </IconButton>
    </TableContainer>
  );
};
