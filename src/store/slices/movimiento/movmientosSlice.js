import { createSlice } from "@reduxjs/toolkit";
export const initialMovimientoForm = {
  id: 0,
  tipo_movimiento: "",
  fecha_movimiento: "",
  descripcion: "",
  id_sucursal: "",
  id_departamento: "",
  empleado_id: "",
  user_id: "",
  doc: ""
};

export const initialDetalleForm = {
  id: 0,
  movimiento_id: "",
  activo_id: "",
  cantidad: ""
};

// export const initialMovimientoForm = {
//   id: 0,
//   tipo_movimiento: "",
//   fecha_movimiento: "",
//   descripcion: "",
//   id_sucursal: "",
//   id_departamento: "",
//   empleado_id: "",
//   user_id: "",
// };
const initialErrors = {
    id: 0,
    tipo_movimiento: "",
    fecha_movimiento: "",
    descripcion: "",
    id_sucursal: "",
    id_departamento: "",
    empleado_id: "",
    user_id: "",
    doc: "",
};


export const movimientosSlice = createSlice({
  name: "movimientos",
  initialState: {
    movimientos: [], //lista
    detalles: [], // lista de detalles
    paginator: {},//paginacion
    movimientoSelected: initialMovimientoForm,
    detalleSelected: initialDetalleForm,
    visibleForm: false,
    errors: initialErrors,//errores
    isLoading: true,//carga
  },
  reducers: {
    addMovimiento: (state, action) => {
      //acciones
      state.movimientos = [
        ...state.movimientos,
        {
          ...action.payload.movimiento,
        },
      ];
      state.detalles = [
        ...state.detalles,
        {
          ...action.payload.detalle,
        },
      ];

      state.movimientoSelected = initialMovimientoForm; //reiniciar estado
      state.detalleSelected = initialDetalleForm; // reiniciar estado del detalle

      state.visibleForm = false;
    },
    removeMovimiento: (state, action) => {
        state.movimientos = state.movimientos.filter
        (movimiento => movimiento.id !== action.payload);
    },
    updateMovimiento: (state, action) => {
      state.movimientos = state.movimientos.map((u) => {
        if (u.id === action.payload.id) {
          return {
            ...action.payload,
          };
        }
        return u;
      });
      state.movimientoSelected = initialMovimientoForm; //reinciar estado
      state.visibleForm = false;
    },
    loadingInitialData: (state) => {
      state.isLoading = true;
      state.errors = null;
    },
    loadingData: (state, { payload }) => {
      state.movimientos = payload.content;
      state.paginator = payload;
      state.isLoading = false;
    },
    onMovimientoSelectedForm: (state, { payload }) => {
      state.movimientoSelected = payload;
      state.visibleForm = true;
    },
    onDetalleSelectedForm: (state, { payload }) => {
      state.detalleSelected = payload;
      state.visibleForm = true;
    },
    onOpenForm: (state) => {
      state.visibleForm = true;
    },
    onCloseForm: (state) => {
      state.visibleForm = false;
      state.movimientoSelected = initialMovimientoForm;
      state.detalleSelected = initialDetalleForm;
    },
    loadingError: (state, { payload }) => {
      state.errors = payload;
    },
  },
});

export const {
  addMovimiento,
   removeMovimiento,
   updateMovimiento,
loadingData,
onMovimientoSelectedForm,
onDetalleSelectedForm,
  onOpenForm,
  onCloseForm,
  loadingError,
} = movimientosSlice.actions;

