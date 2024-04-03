//Define un servicio para realizar la llamada a la API y cargar las sucursales.
// src/services/sucursalesService.js
import movimientosApi from "../apis/movimientosApi";

const BASE_URL = '';

  export const findAll = async () => {
    try {
      const response = await movimientosApi.get(`${BASE_URL}/cargaSucursales`);
      console.log("response data sucursales: ", response);

      return response;
    } catch (error) {
      throw new Error('Error al cargar los sucursales ');
    }
  };
  