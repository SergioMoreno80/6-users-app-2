// redux/datosActions.js
import axios from 'axios';
import {
  cargarDatosInicio,
  cargarDatosExito,
  cargarDatosFallo,
  actualizarPagina,
} from '../store/slices/users/activosSlice';

import activosApi from "../apis/activosApi";
const BASE_URL_A = '';

//const URL_API = 'http://localhost:8080/api/activos';

// export const cargarDatos2 = (pagina) => async (dispatch) => {
//   try {
//     dispatch(cargarDatosInicio());
//     const response = await activosApi.get(`${BASE_URL}?pagina=${pagina}`);

//     dispatch(cargarDatosExito(response.data));
//   } catch (error) {
//     dispatch(cargarDatosFallo(error.message));
//   }
// };

export const cargarDatos = async (page = 0) => {
  try {
      const response = await activosApi.get(`${BASE_URL_A}/page/${page}`);
      return response;
  } catch (error) {
      console.error(error);
      throw error;
  }
}

export const cambiarPagina = (pagina) => (dispatch) => {
  dispatch(actualizarPagina(pagina));
  dispatch(cargarDatos(pagina));
};
