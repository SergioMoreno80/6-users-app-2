import { createSlice } from "@reduxjs/toolkit";

export const initialActivoForm = {
  id: 0,
  nombre: "",
  descripcion: "",
  fabricante_id: "",
  modelo: "",
  no_serie: "",
  tipo: "",
  grupoactivo_id: "",
  proveedor_id: "",
  factura: "",
  estatus: "",
  clave_busqueda: "",
  importe: 0,
  fecha_compra: "",
  fecha_ingreso: "",
  estatus: "",
  clave_busqueda: "",
  imagen: "",
};
const initialErrors = {
  nombre: "",
  descripcion: "",
  fabricante_id: "",
  modelo: "",
  no_serie: "",
  tipo: "",
  grupoactivo_id: "",
  proveedor_id: "",
  factura: "",
  estatus: "",
  clave_busqueda: "",
  importe: 0,
  fecha_compra: "",
  fecha_ingreso: "",
  estatus: "",
  clave_busqueda: "",
  imagen: "",
  admin: false,
};
export const activosSlice = createSlice({
  name: "activos",
  initialState: {
    activos: [], //lista
    paginator: {},//paginacion
    activoSelected: initialActivoForm,
    visibleForm: false,
    errors: initialErrors,//errores
    isLoading: true,//carga
  },
  reducers: {
    addActivo: (state, action) => {
      //acciones
      state.activos = [
        ...state.activos,
        {
          ...action.payload,
        },
      ];
      state.activoSelected = initialActivoForm; //reiniciar estado
      state.visibleForm = false;
    },
    removeActivo: (state, action) => {
      state.activos = state.activos.filter(
        (activo) => activo.id !== action.payload
      );
    },
    updateActivo: (state, action) => {
      state.activos = state.activos.map((u) => {
        if (u.id === action.payload.id) {
          return {
            ...action.payload,
          };
        }
        return u;
      });
      state.activoSelected = initialActivoForm; //reinciar estado
      state.visibleForm = false;
    },
    loadingDatosInicio: (state) => {
      state.isLoading = true;
      state.errors = null;
    },
    loadingActivos: (state, { payload }) => {
      state.activos = payload.content;
      state.paginator = payload;
      state.isLoading = false;
    },
    loadingData: (state, { payload }) => {
      // console.log('loadingData activo', payload); // Agregar un console.log() para imprimir los datos de payload
      state.activos = payload;
      state.isLoading = false;
    },
    onActivoSelectedForm: (state, { payload }) => {
      state.activoSelected = payload;
      state.visibleForm = true;
    },
    onOpenForm: (state) => {
      state.visibleForm = true;
    },
    onCloseForm: (state) => {
      state.visibleForm = false;
      state.activoSelected = initialActivoForm;
    },
    loadingError: (state, { payload }) => {
      state.errors = payload;
    },
  },
});

export const {
  addActivo,
  removeActivo,
  updateActivo,
  loadingActivos,
  loadingData,
  onActivoSelectedForm,
  onOpenForm,
  onCloseForm,
  loadingError,
} = activosSlice.actions;