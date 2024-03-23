import movimientosApi from "../apis/movimientosApi";

const BASE_URL = '';
export const findAll = async () => {
  try {
    const response = await movimientosApi.get(`${BASE_URL}/cargaEmpleados`);
    // console.log("function finAll() . ");
    return response;
  } catch (error) {
    throw new Error('Error al cargar los empleados 2');
  }
};


