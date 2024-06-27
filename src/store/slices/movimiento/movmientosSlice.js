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
  doc: "",
};

export const initialDetalleForm = {
  id: 0,
  movimiento_id: "",
  activo_id: "",
  cantidad: "",
};

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
    movimientos: [],
    detallesMovimiento: [],
    detallesByMovimiento: [], // Nuevo campo para detalles de un movimiento específico
    paginator: {},
    movimientoSelected: initialMovimientoForm,
    detalleSelected: initialDetalleForm,
    visibleForm: false,
    errors: initialErrors,
    isLoading: true,
    isLoadingDetails: true, // Separate isLoading state for details

  },
  reducers: {
    addMovimiento: (state, action) => {
      state.movimientos = [...state.movimientos, action.payload.movimiento];
      state.detallesMovimiento = [...state.detallesMovimiento, action.payload.detalle];

      state.movimientoSelected = initialMovimientoForm;
      state.detalleSelected = initialDetalleForm;
      state.visibleForm = false;
    },
    removeMovimiento: (state, action) => {
      state.movimientos = state.movimientos.filter(
        (movimiento) => movimiento.id !== action.payload
      );
      state.detallesMovimiento = state.detallesMovimiento.filter(
        (detalle) => detalle.movimiento_id !== action.payload
      );
    },
    updateMovimiento: (state, action) => {
      state.movimientos = state.movimientos.map((movimiento) =>
        movimiento.id === action.payload.id ? action.payload : movimiento
      );
      state.movimientoSelected = initialMovimientoForm;
      state.visibleForm = false;
    },
    addDetalleMovimiento: (state, action) => {
      state.detallesMovimiento = [...state.detallesMovimiento, action.payload];
    },
    removeDetalleMovimiento: (state, action) => {
      state.detallesMovimiento = state.detallesMovimiento.filter(
        (detalle) => detalle.id !== action.payload
      );
    },
    updateDetalleMovimiento: (state, action) => {
      state.detallesMovimiento = state.detallesMovimiento.map((detalle) =>
        detalle.id === action.payload.id ? action.payload : detalle
      );
    },
    loadingInitialData: (state) => {
      state.isLoading = true;
      state.errors = null;
    },
    loadingMov: (state, { payload }) => {
      state.movimientos = payload.content;
      state.paginator = payload;
      state.isLoading = false;
    },
    loadingData: (state, { payload }) => {
      state.movimientos = payload;
      state.isLoading = false;
    },
    loadingDatabyActivo: (state, { payload }) => {
      state.movimientos = payload;
      state.isLoading = false;
    },
    loadingDetallesbyMovimiento: (state, { payload }) => {
      state.detallesByMovimiento = payload;
      state.isLoadingDetails = false; // Puedes ajustar esto dependiendo de cómo manejes la carga de detalles
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
  addDetalleMovimiento,
  removeDetalleMovimiento,
  updateDetalleMovimiento,
  loadingMov,
  loadingData,
  loadingDatabyActivo,
  loadingDetallesbyMovimiento,
  onMovimientoSelectedForm,
  onDetalleSelectedForm,
  onOpenForm,
  onCloseForm,
  loadingError,
} = movimientosSlice.actions;

export default movimientosSlice.reducer;
