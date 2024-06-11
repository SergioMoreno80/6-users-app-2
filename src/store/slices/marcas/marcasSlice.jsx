//DEFINE UN SLICE REDUX PARA MENJAR EL ESTADO DE MARCAS/FABRICANTE.
import { createSlice } from "@reduxjs/toolkit";
export const initialForm = {
  fabricante_id: 0,
  nombre: "",
  descripcion: "",
  estatus: "",
  clave_busqueda: "",
};
const initialErrors = {
  nombre: "",
  descripcion: "",
  estatus: "",
  clave_busqueda: "",
};
export const marcasSlice = createSlice({
  name: 'fabricantes',
  initialState: {
    fabricantes: [],
    paginator: {},//paginacion
    fabricanteSelected: initialForm,
    visibleForm: false,
    errors: initialErrors,//errores
    isLoading: true,
  },
  reducers: {
    addFabricante: (state, action) => {
      //acciones
      state.fabricantes = [
        ...state.fabricantes,
        {
          ...action.payload,
        },
      ];
      state.fabricanteSelected = initialForm; //reiniciar estado
      state.visibleForm = false;
    },
    removeFabricante: (state, action) => {
      state.fabricantes = state.fabricantes.filter(
        (prov) => prov.fabricante_id !== action.payload
      );
    },
    updateFabricante: (state, action) => {
      state.fabricantes = state.fabricantes.map((prov) => {
        if (prov.fabricante_id === action.payload.fabricante_id) {
          return action.payload;
        }
        return prov;
      });
      state.fabricanteSelected = initialForm; // reiniciar estado
      state.visibleForm = false;
    },
    loadInitialData: (state) => {
      state.isLoading = true;
      state.errors = null;
    },
    loadingData: (state, { payload }) => {
      state.fabricantes = payload;
      state.isLoading = false;
    },
    onSelectedForm: (state, { payload }) => {
      state.fabricanteSelected = payload;
      state.visibleForm = true;
    },
    onOpenForm: (state) => {
      state.visibleForm = true;
    },
    onCloseForm: (state) => {
      state.visibleForm = false;
      state.fabricanteSelected = initialForm;
    },
    loadingError: (state, { payload }) => {
      state.isLoading = false;
      state.errors = payload;
    },
  },
});

export const {
  addFabricante,
  removeFabricante,
  updateFabricante,
  loadingData,
  onSelectedForm,
  onOpenForm,
  onCloseForm,
  loadingError,
} = marcasSlice.actions;


