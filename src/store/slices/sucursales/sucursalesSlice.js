//DEFINE UN SLICE REDUX PARA MENJAR EL ESTADO DE LAS SUCURSALES.
import { createSlice } from "@reduxjs/toolkit";

export const sucursalesSlice = createSlice({
  name: 'sucursales',
  initialState: {
    sucursales: [],
    isLoading: false,
    errors: null,//errores
  },
  reducers: {
    loadInitialData: (state) => {
      state.isLoading = true;
      state.errors = null;
    },
    loadingData: (state, { payload }) => {
      state.sucursales = payload;
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
} = sucursalesSlice.actions;


