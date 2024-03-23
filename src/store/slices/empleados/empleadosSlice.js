
import { createSlice } from "@reduxjs/toolkit";

export const empleadosSlice = createSlice({
  name: 'empleado',
  initialState: {
    empleados: [],
    isLoading: false,
    errors: null,//errores

  },
  reducers: {
    cargarEmpleadosInicio: (state) => {
      state.isLoading = true;
      state.errors = null;
    },
    loadingEmpleados: (state, { payload }) => {
      state.empleados = payload;
      //evitar colocar payload.content ya que la estructura es diferente
      state.isLoading = false;
    },

    loadingError: (state, { payload }) => {
      state.isLoading = false;
      state.errors = payload;
    },
  },
});

export const {
  cargarEmpleadosInicio,
  loadingEmpleados,
  loadingError,
} = empleadosSlice.actions;

