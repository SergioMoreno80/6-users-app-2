// src/hooks/useCargarSucursales.js
import { useAuth } from "../auth/hooks/useAuth";
import { useDispatch, useSelector } from 'react-redux';
import { loadingData } from '../store/slices/sucursales/sucursalesSlice';
import { findAll } from "../services/sucursalesService";

export const useSucursales = () => {
  const dispatch = useDispatch();
  const { sucursales,  
    errors, isLoading } = useSelector(state => state.sucursales);
  const { handlerLogout } = useAuth();
  const getSucursales = async () => {
    try {
      const result = await findAll();
      console.log('Lista de sucursales desde hook - :', result.data); // Agregar este console.log
      dispatch(loadingData(result.data));
    } catch (error) {
      if (error.response?.status == 401) {
        handlerLogout();
    }
    }
  };

  return {
    sucursales,
    errors,
    isLoading,
    getSucursales,
  }; };

