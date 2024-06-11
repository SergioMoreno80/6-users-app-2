import { configureStore } from "@reduxjs/toolkit";
import { usersSlice } from "./slices/users/usersSlice";
import { activosSlice } from "./slices/users/activosSlice";
import { authSlice } from "./slices/auth/authSlice";
import { empleadosSlice } from "./slices/empleados/empleadosSlice";
import { sucursalesSlice } from "./slices/sucursales/sucursalesSlice";
import { departamentosSlice } from "./slices/departamentos/departamentosSlice";
import { movimientosSlice } from "./slices/movimiento/movmientosSlice";
import { proveedorSlice } from "./slices/proveedores/proveedorSlice";
import { marcasSlice} from "./slices/marcas/marcasSlice";

export const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
    activos: activosSlice.reducer,
    movimientos: movimientosSlice.reducer,
    empleados: empleadosSlice.reducer,
    sucursales: sucursalesSlice.reducer,
    departamentos: departamentosSlice.reducer,
    //crear slice para Proveedores, fabricantes y grupo de activos.
    proveedor: proveedorSlice.reducer,
    fabricantes: marcasSlice.reducer,
    auth: authSlice.reducer,
  },
});
