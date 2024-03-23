// src/features/sucursales/sucursalesSlice.js
//DEFINE UN SLICE REDUX PARA MENJAR EL ESTADO DE los departamentos.
import { createSlice } from '@reduxjs/toolkit';

export const departamentosSlice = createSlice({
  name: 'departamentos',
  initialState: {
    departamentos: [],
    isLoading: false,
    errors: null,//errores
  },
  reducers: {
    loadInitialData: (state) => {
      state.isLoading = true;
      state.errors = null;
    },
    loadingData: (state, { payload }) => {
      state.departamentos = payload;
      state.isLoading = false;
    },
    loadingError: (state, { payload }) => {
      state.isLoading = false;
      state.errors = payload;
    },
  },
});

export const {
  loadInitialData,
  loadingData,
  loadingError,
} = departamentosSlice.actions;

