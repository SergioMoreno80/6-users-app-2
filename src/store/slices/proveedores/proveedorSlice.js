//DEFINE UN SLICE REDUX PARA MENJAR EL ESTADO DE PROVEEDORES.
import { createSlice } from "@reduxjs/toolkit";
export const initialForm = {
  proveedor_id: 0,
  nombre: "",
  descripcion: "",
  estatus: "",
};
const initialErrors = {
  nombre: "",
  descripcion: "",
  estatus: "",
};
export const proveedorSlice = createSlice({
  name: 'proveedor',
  initialState: {
    proveedor: [],
    paginator: {},//paginacion
    proveedorSelected: initialForm,
    visibleForm: false,
    errors: initialErrors,//errores
    isLoading: true,
  },
  reducers: {
    addProveedor: (state, action) => {
      //acciones
      state.proveedor = [
        ...state.proveedor,
        {
          ...action.payload,
        },
      ];
      state.proveedorSelected = initialForm; //reiniciar estado
      state.visibleForm = false;
    },
    removeProveedor: (state, action) => {
      state.proveedor = state.proveedor.filter(
        (prov) => prov.proveedor_id !== action.payload
      );
    },
    updateProveedor: (state, action) => {
      state.proveedor = state.proveedor.map((prov) => {
        if (prov.proveedor_id === action.payload.proveedor_id) {
          return action.payload;
        }
        return prov;
      });
      state.proveedorSelected = initialForm; // reiniciar estado
      state.visibleForm = false;
    },
    loadInitialData: (state) => {
      state.isLoading = true;
      state.errors = null;
    },
    loadingData: (state, { payload }) => {
      state.proveedor = payload;
      state.isLoading = false;
    },
    onSelectedForm: (state, { payload }) => {
      state.proveedorSelected = payload;
      state.visibleForm = true;
    },
    onOpenForm: (state) => {
      state.visibleForm = true;
    },
    onCloseForm: (state) => {
      state.visibleForm = false;
      state.proveedorSelected = initialForm;
    },
    loadingError: (state, { payload }) => {
      state.isLoading = false;
      state.errors = payload;
    },
  },
});

export const {
  addProveedor,
  removeProveedor,
  updateProveedor,
  loadingData,
  onSelectedForm,
  onOpenForm,
  onCloseForm,
  loadingError,
} = proveedorSlice.actions;


