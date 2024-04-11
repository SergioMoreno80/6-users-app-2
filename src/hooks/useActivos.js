import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { findAll, findAllPages, remove, save, update } from "../services/activoService";

import { useDispatch, useSelector } from "react-redux";
import {
  initialActivoForm,
  addActivo,
  removeActivo,
  updateActivo,
  loadingActivos,
  loadingData,
  onActivoSelectedForm,
  onOpenForm,
  onCloseForm,
  loadingError,
} from "../store/slices/users/activosSlice";

import { useAuth } from "../auth/hooks/useAuth";

export const useActivos = () => {
  const { activos, activoSelected, visibleForm, errors, isLoading, paginator } =
    useSelector((state) => state.activos);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { login, handlerLogout } = useAuth();

  const getActivos = async (page = 0) => {
    try {
      const result = await findAllPages(page);
      console.log("login activos:",result);

      dispatch(loadingActivos(result.data));
    } catch (error) {
      if (error.response?.status == 401) {
        handlerLogout();
      }
    }
  };
//listado de activos para busqueda inteligente.
  const getList = async () => {
    try {
      const result = await findAll();
      // console.log('Lista de activos desde hook - :', result.data); // Agregar este console.log
      dispatch(loadingData(result.data));
    } catch (error) {
      if (error.response?.status == 401) {
        handlerLogout();
    }
    }
  };

  const handlerAddActivo = async (activo) => {
    if (!login.isAdmin) return;
    let response;
    try {
      if (activo.activo_id === 0) {
        response = await save(activo);
        dispatch(addActivo(response.data));
      } else {
        response = await update(activo);
        dispatch(updateActivo(response.data));
      }

      Swal.fire(
        activo.id === 0 ? "activo Creado" : "activo Actualizado",
        activo.id === 0
          ? "El activo ha sido creado con exito!"
          : "El activo ha sido actualizado con exito!",
        "success"
      );
      handlerCloseForm();
      navigate("/activos");
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

  const handlerRemoveActivo = (activo_id) => {
     console.log("id remove",activo_id);

    if (!login.isAdmin) return;

    Swal.fire({
      title: "Esta seguro que desea eliminar?",
      text: "Cuidado el activo sera eliminado!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await remove(activo_id);

          dispatch(removeActivo(activo_id));

          Swal.fire(
            "Activo Eliminado!",
            "El activo ha sido eliminado con exito!",
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

  const handlerActivoSelectedForm = (activo) => {
    dispatch(onActivoSelectedForm({ ...activo }));
  };

  const handlerOpenForm = () => {
    dispatch(onOpenForm());
  };

  const handlerCloseForm = () => {
    dispatch(onCloseForm());
    dispatch(loadingError({}));
  };
  return {
    activos,
    activoSelected,
    initialActivoForm,
    visibleForm,
    errors,
    isLoading,
    paginator,
    handlerAddActivo,
    handlerRemoveActivo,
    handlerActivoSelectedForm,
    handlerOpenForm,
    handlerCloseForm,
    getActivos,
    getList,
  };
};
