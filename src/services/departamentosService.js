import movimientosApi from "../apis/movimientosApi";

const BASE_URL = '';

  export const findAll = async () => {
    try {
      const response = await movimientosApi.get(`${BASE_URL}/cargaDepartamentos`);
      // console.log("function finAll() departamentos. ");
      return response;
    } catch (error) {
      throw new Error('Error al cargar departamentos ');
    }
  };
  