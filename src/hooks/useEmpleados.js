// src/hooks/useCargarEmpleados.js
import { findAll } from '../services/empleadosService';
import { useDispatch, useSelector } from 'react-redux';
import {loadingEmpleados} from '../store/slices/empleados/empleadosSlice';
import { useAuth } from "../auth/hooks/useAuth";

export const useEmpleados = () => {
  //const empleados = useSelector(activoSelected);
  const dispatch = useDispatch();
  const { empleados,  
    errors, isLoading } = useSelector(state => state.empleados);

  const { handlerLogout } = useAuth();

  const getEmpleados = async () => {
    try {
      const result = await findAll();
      //console.log('Lista de empleados desde useEmpleados - :', result.data); // Agregar este console.log
      dispatch(loadingEmpleados(result.data));
    } catch (error) {
      if (error.response?.status == 401) {
        handlerLogout();
    }
    }
  };


  return {
    empleados,
    errors,
    isLoading,
    getEmpleados,
  }; 
};


