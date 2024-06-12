import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { findAll,findByActivoId,findAllPages, remove, save, update, saveDetalles  } from "../services/movimientoService";

import { useDispatch, useSelector } from "react-redux";
import {
  initialMovimientoForm,
  initialDetalleForm,
  addMovimiento,
  removeMovimiento,
  updateMovimiento,
  loadingMov,
  loadingData,
  loadingDatabyActivo,
  onMovimientoSelectedForm,
  onDetalleSelectedForm,
  onOpenForm,
  onCloseForm,
  loadingError,
} from "../store/slices/movimiento/movmientosSlice";

import { useAuth } from "../auth/hooks/useAuth";

export const useMovimientos = () => {
  const { movimientos, movimientoSelected, visibleForm, errors, isLoading, paginator } =
    useSelector((state) => state.movimientos);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { login, handlerLogout } = useAuth();

  const getMovimientos = async (page = 0) => {
    try {
      const result = await findAllPages(page);
      console.log("response data movimientos: ", result);

      dispatch(loadingMov(result.data));
    } catch (error) {
      if (error.response?.status == 401) {
        handlerLogout();
      }
    }
  };

  //listado de movimientos para busqueda inteligente.
  const getListMov = async () => {
    try {
      const result = await findAll();
      console.log("Lista de movimientos desde hook - :", result.data); // Agregar este console.log
      dispatch(loadingData(result.data));
    } catch (error) {
      if (error.response?.status == 401) {
        handlerLogout();
    }
    }
  };

  const getListByActivo = async (activoId) => {
    try {
      const result = await findByActivoId(activoId);
      console.log("Lista de movimientos por activo UseMov :", result); 
      dispatch(loadingDatabyActivo(result));
    } catch (error) {
      if (error.response?.status == 401) {
        handlerLogout();
    }else {
      throw error; // Lanza el error para que el componente que utiliza el hook pueda manejarlo
    }
    }
  };

  const handlerAddMovimiento = async (movimiento, detalle) => {
    console.log("movimiento",movimiento);
    console.log("detalle", detalle);

    if (!login.isAdmin) return;
    let response;
    try {
      if (movimiento.id === 0) {
        response = await save(movimiento);
        console.log("response data: ", response);
        const movimientoId = response.data.id; // Obtener el ID del nuevo movimiento guardado
      // Guardar los detalles del movimiento
      // console.log("detalles...", detalle);
      //   await saveDetalles(detalle, movimientoId);
      if (Array.isArray(detalle)) {
        await saveDetalles({ detalle, movimientoId });
      } else {
        console.error("detalle is not an array or is undefined");
        // Handle the case where detalle is not an array
      }
        dispatch(addMovimiento(response.data));

      } else {
        response = await update(movimiento);
        dispatch(updateMovimiento(response.data));
      }

      Swal.fire(
        movimiento.id === 0 ? "movimiento Creado" : "movimiento Actualizado",
        movimiento.id === 0
          ? "El movimiento ha sido creado con exito!"
          : "El movimiento ha sido actualizado con exito!",
        "success"
      );
      handlerCloseForm();
      // console.error("voy a entrar a navigate");
      navigate("/movimientos");
    } catch (error) {
      if (error.response && error.response.status == 400) {
        dispatch(loadingError(error.response.data));
      } else if (
        error.response &&
        error.response.status == 500 &&
        error.response.data?.message?.includes("constraint")
      ) {
        if (error.response.data?.message?.includes("UK_nombre")) {
          dispatch(loadingError({ nombre: "El nombre ya existe!" }));
        }
      } else if (error.response?.status == 401) {
        handlerLogout();
      } else {
        throw error;
      }
    }
  };

  const handlerRemoveMovimiento = (id) => {
    // console.log(id);

    if (!login.isAdmin) return;

    Swal.fire({
      title: "Esta seguro que desea eliminar?",
      text: "Cuidado el movimiento sera eliminado!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await remove(id);

          dispatch(removeMovimiento(id));

          Swal.fire(
            "movimiento Eliminado!",
            "El movimiento ha sido eliminado con exito!",
            "success"
          );
        } catch (error) {
          if (error.response?.status == 401) {
            handlerLogout();
          }
        }
      }
    });
  };

  const handlerMovimientoSelectedForm = (movimiento) => {
    dispatch(onMovimientoSelectedForm({ ...movimiento }));
  };
  const handlerDetalleSelectedForm = (movimiento) => {
    dispatch(onDetalleSelectedForm({ ...movimiento }));
  };
  const handlerOpenForm = () => {
    dispatch(onOpenForm());
  };

  const handlerCloseForm = () => {
    dispatch(onCloseForm());
    dispatch(loadingError({}));
  };
  return {
    movimientos,
    movimientoSelected,
    initialMovimientoForm,
    initialDetalleForm,
    visibleForm,
    errors,
    isLoading,
    paginator,
    handlerAddMovimiento,
    handlerRemoveMovimiento,
    handlerMovimientoSelectedForm,
    handlerDetalleSelectedForm,
    handlerOpenForm,
    handlerCloseForm,
    getMovimientos,
    getListMov,
    getListByActivo,
  };
};
