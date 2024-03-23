// src/hooks/useCargarDepartamentos.js
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from "../auth/hooks/useAuth";
import { findAll } from '../services/departamentosService';
import { loadingData } from '../store/slices/departamentos/departamentosSlice';

export const useDepartamentos = () => {
  const dispatch = useDispatch();
  const { departamentos,  
    errors, isLoading } = useSelector(state => state.departamentos);

  const { handlerLogout } = useAuth();

  const getDepartamentos = async () => {
    try {
      const result = await findAll();
      // console.log('Lista de departamentos desde useDepar - :', result.data); // Agregar este console.log
      dispatch(loadingData(result.data));
    } catch (error) {
      if (error.response?.status == 401) {
        handlerLogout();
    }
    }
  };


  return {
    departamentos,
    errors,
    isLoading,
    getDepartamentos,
  }; 
};

