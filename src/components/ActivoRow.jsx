import { NavLink } from "react-router-dom"
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
import { format } from 'date-fns';

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

export const ActivoRow = ({ imagen, activo_id, nombre, descripcion, factura, fecha_compra, no_serie, modelo, importe, proveedor_id, estatus }) => {
    const { handlerActivoSelectedForm, handlerRemoveActivo } = useActivos();
    const { login } = useAuth();
    const [open, setOpen] = React.useState(false);
    const formattedCurrency = new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'MXN', // Puedes ajustar la moneda según tus necesidades
        minimumFractionDigits: 2,
      }).format(importe);

      // Convertir la cadena a un objeto Date
  const dateObject = new Date(fecha_compra);

  // Dar formato a la fecha utilizando date-fns
  const formattedDate = format(dateObject, 'dd/MM/yyyy');
//      <TableCell>{formattedDate}</TableCell>


    return (
        <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          <img
            src={imagen}
            alt={activo_id}
            style={{ width: "50px" }}
          />
        </TableCell>
        <TableCell component="th" scope="row" align="left">
          {nombre}
        </TableCell>

        <TableCell align="center">{factura}</TableCell>
        <TableCell align="center">{formattedDate}</TableCell>
        <TableCell align="center">{formattedCurrency}</TableCell>
        <TableCell align="center">{proveedor_id}</TableCell>
        <TableCell align="center">
          <Button
            variant="contained"
            color={estatus === "A" ? "success" : "error"}
            onClick={() => changeStatus(id)}
          >
            {estatus === "A" ? "ACTIVO" : "INACTIVO"}
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Fecha del movimiento</TableCell>
                    <TableCell>Asignado a</TableCell>
                    <TableCell align="right">Ubicacion</TableCell>
                    <TableCell align="right">Departamento </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>

                  {/* {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">{historyRow.departamento}</TableCell>
            
                    </TableRow>
                  ))} */}

                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
        
        // <TableCell component="th" scope="row" align="left">
        //   {nombre}
        // </TableCell>

        // <TableCell align="center">{descripcion}</TableCell>
        // <TableCell align="center">{fecha_compra}</TableCell>
        // <TableCell align="center">{factura}</TableCell>
        // <tr>
        //     <td>{id}</td>
        //     <td>{nombre}</td>
        //     <td>{descripcion}</td>
        //     <td>{factura}</td>
        //     <td>{fecha_compra}</td>
        //     <td>{no_serie}</td>
        //     <td>{modelo}</td>

        //     {!login.isAdmin ||
        //         <>
        //             <td>
        //                 <button
        //                     type="button"
        //                     className="btn btn-secondary btn-sm"
        //                     onClick={() => handlerActivoSelectedForm({
        //                         id,
        //                         nombre,
        //                         descripcion
                                
        //                     })}
        //                 >
        //                     Editar
        //                 </button>
        //             </td>
        //             <td>
        //                 <NavLink className={'btn btn-secondary btn-sm'}
        //                     to={'/users/edit/' + id} >
        //                     update route
        //                 </NavLink>
        //             </td>
        //             <td>
        //                 <button
        //                     type="button"
        //                     className="btn btn-danger btn-sm"
        //                     onClick={() => handlerRemoveActivo(id)}
        //                 >
        //                     Eliminar
        //                 </button>
        //             </td>
        //         </>
        //     }
        // </tr>
    )
}