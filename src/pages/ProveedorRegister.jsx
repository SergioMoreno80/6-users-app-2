import React, { useState, useEffect } from "react";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import PropTypes from "prop-types";
import { NumericFormat } from "react-number-format";
import SaveSharpIcon from "@mui/icons-material/SaveSharp";
import {
  TextField,
  Grid,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { useProveedores } from "../hooks/useProveedores";


const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});


export const ProveedorRegister = ({ proveedorSelected, handlerCloseForm }) => {
  const { initialForm, handlerAddProveedor, errors } = useProveedores();

  const [proveedorForm, setProveedorForm] = useState(initialForm);
  const { nombre, descripcion, estatus } = proveedorForm;

  const [alertaAbierta, setAlertaAbierta] = useState(false);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setProveedorForm({
      ...proveedorForm,
      [name]: value,
    });
  };

  useEffect(() => {
    if (proveedorSelected) {
      setProveedorForm({
        ...proveedorSelected,
      });
    }
  }, [proveedorSelected]);
  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("Información de proveedorForm:", proveedorForm);

    handlerAddProveedor(proveedorForm);
    setProveedorForm(initialForm);
  };

  const onCloseForm = () => {
    handlerCloseForm();
    setProveedorForm(initialForm);
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}
      >
        <Box p={2} textAlign="center" bgcolor="#0E0E2C" color="white">
          <NoteAddIcon color="warning" />
          <Typography variant="h6">Registro de Proveedor</Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} marginTop={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="nombre"
                label="Nombre"
                name="nombre"
                autoComplete="Nombre"
                value={nombre}
                autoFocus
                onChange={onInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="outlined-multiline-static"
                label="Descripcion/Observaciones"
                name="descripcion"
                multiline
                maxRows={3}
                autoComplete="Descripcion"
                value={descripcion}
                onChange={onInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Estatus</InputLabel>
                <Select
                  value={estatus}
                  onChange={onInputChange}
                  name="estatus"
                >
                  <MenuItem value="A">ACTIVO</MenuItem>
                  <MenuItem value="I">INACTIVO</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  marginTop: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                  fontSize: "14px",
                }}
                startIcon={<SaveSharpIcon />}
              >
                GUARDAR
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};
