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

function createData(Imagen, name, factura, fecha, carbs, protein, price, status) {
  return {
    Imagen, name,
    factura,
    fecha,
    carbs,
    protein,
    price,
    status,
    history: [
      {
        date: "2020-01-05",
        customerId: "Nancy Montemayor",
        amount: "San Jose General",
        departamento: "Sucursal",

      },
      {
        date: "2020-01-02",
        customerId: "Roberto Carlos",
        amount: "Flosamed",
        departamento: "Contabilidad",

      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

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
            src={row.Imagen}
            alt={row.name}
            style={{ width: "50px" }}
          />
        </TableCell>
        <TableCell component="th" scope="row" align="left">
          {row.name}
        </TableCell>

        <TableCell align="center">{row.factura}</TableCell>
        <TableCell align="center">{row.fecha}</TableCell>
        <TableCell align="center">{row.carbs}</TableCell>
        <TableCell align="center">{row.protein}</TableCell>
        <TableCell align="center">
          <Button
            variant="contained"
            color={row.status === "Activo" ? "success" : "error"}
            onClick={() => changeStatus(row.id)}
          >
            {row.status}
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
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">{historyRow.departamento}</TableCell>
            {/*

                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                  */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    factura: PropTypes.string.isRequired,
    carbs: PropTypes.number.isRequired,
    fecha: PropTypes.string.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.string.isRequired,
  }).isRequired,
};

const rows = [
  createData(konica,
    "Impresora KONICA",
    "F00009031209",
    "23-01-2022",
    24,
    "KONICA",
    3.99,
    "inactivo"
  ),
  createData(chevy,
    "Camion Chevrolet",
    "F00009031230",
    "19-01-2021",
    37,
    "Chevrolet Tamaulipas",
    11,
    "Activo"
  ),
  createData(laptop,
    "LAPTOP DELL",
    "F00009031450",
    "12-04-2020",
    24,
    "Dell Mexico",
    2,
    "Activo"
  ),
  createData(pc,
    "PC de Escritorio",
    "F000090312123",
    "12-09-2023",
    67,
    "SMART TI",
    3.5,
    "Activo"
  ),
  createData(estantes,
    "Estantes",
    "F00009098302",
    "12-01-2018",
    49,
    "ULINE",
    2.99,
    "inactivo"
  ),
];

export const Personal = () => {
  const [isTableExpanded, setTableExpanded] = useState(true);

  const toggleTableSize = () => {
    setTableExpanded(!isTableExpanded);
  };

  const changeStatus = (id) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === "Activo" ? "Inactivo" : "Activo",
            }
          : item
      )
    );
  };
  return (
    <TableContainer
      component={Paper}
      style={{
        marginLeft: isTableExpanded ? "120px" : "120",
        marginTop: "100px",
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
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
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
