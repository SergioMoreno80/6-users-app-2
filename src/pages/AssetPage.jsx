import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import QR from "../images/QR.png";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// Ajusta la ruta a tu imagen de logotipo

import {
  AccountTree,
  Apartment,
  AppRegistration,
  BrandingWatermark,
  BrandingWatermarkRounded,
  EmojiPeople,
  FireplaceSharp,
  FmdGood,
  LibraryBooks,
  People,
  RequestQuote,
} from "@mui/icons-material";
import dayjs from 'dayjs';
dayjs.locale('es'); 

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}

      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const currencies = [
  {
    value: "P",
    label: "PROPIO",
  },
  {
    value: "C",
    label: "CONSIGNACION",
  },
];

// const grupos = [
//   {
//     value: "MO",
//     label: "Mobiiario",
//   },
//   {
//     value: "MA",
//     label: "Maquinaria",
//   },
//   {
//     value: "T",
//     label: "Transporte",
//   },
//   {
//     value: "OF",
//     label: "Equipo de oficina",
//   },
// ];

// const proveedor = [
//   {
//     value: "p1",
//     label: "Chevrolet Tamaulipas",
//   },
//   {
//     value: "p2",
//     label: "Nissan Mexico",
//   },
//   {
//     value: "p3",
//     label: "Toyota Monterrey",
//   },
//   {
//     value: "p4",
//     label: "Volswagen Tampico",
//   },
// ];

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

//export default function BrandPage() {
export const AssetPage = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <RequestQuote />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registro de Activos
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid item xs={6} style={{ alignSelf: "flex-end" }}>
              <img
                src={QR}
                alt="QR"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  width: "auto",
                  height: "auto",
                }}
              />
            </Grid>
            <Grid container style={{ height: "100%" }} spacing={2}>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="Ubicacion"
                  label="Ubicacion"
                  name="Ubicacion"
                  autoComplete="Ubicacion"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="Nombre"
                  label="Nombre"
                  name="Nombre"
                  autoComplete="Nombre"
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  required
                  fullWidth
                  id="Fabricante"
                  label="Fabricante"
                  name="Fabricante"
                  autoComplete="Fabricante"
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  required
                  fullWidth
                  id="modelo"
                  label="Modelo"
                  name="modelo"
                  autoComplete="modelo"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  autoComplete="given-serie"
                  name="noserie"
                  required
                  fullWidth
                  id="noserie"
                  label="No. de Serie"
                  autoFocus
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="outlined-select-currency-native"
                  select
                  label="Clasificacion"
                  defaultValue=""
                  SelectProps={{
                    native: true,
                  }}
                  helperText="Seleccionar"
                  fullWidth
                >
                  {currencies.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="outlined-select-currency-native"
                  select
                  label="Grupo de Activo"
                  defaultValue="MA"
                  SelectProps={{
                    native: true,
                  }}
                  helperText="Seleccionar"
                  fullWidth
                >
                  {grupos.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  fullWidth
                  id="lote"
                  label="lote"
                  name="lote"
                  autoComplete="lote"
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  id="outlined-select-currency-native"
                  select
                  label="Proveedor"
                  defaultValue="p1"
                  SelectProps={{
                    native: true,
                  }}
                  helperText="Seleccionar"
                  fullWidth
                >
                  {proveedor.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={2} >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    
                  <DatePicker             
                  label="Fecha de Compra"
                  fullWidth
 
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={2} >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker             
                  label="Fecha de Inicio de Uso"
                  fullWidth
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>

            <Button
              type="submit"
              
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Guardar
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
};
