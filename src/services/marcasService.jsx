//Define un servicio para realizar la llamada a la API y cargar las sucursales.
// src/services/sucursalesService.js
import marcasApi from "../apis/marcasApi";

const BASE_URL = '';

  export const findAll = async () => {
    try {
      const response = await marcasApi.get(BASE_URL);

      console.log("response data fabricantes: ", response);

      return response;
    } catch (error) {
      throw new Error('Error al cargar los fabricantes ');
    }
  };

export const save = async ({ nombre, descripcion, estatus, clave_busqueda }) => {
    try {
      //envio en ForData, ya que en backend se utiliza modelAttribute.
      const formData = new FormData();
      formData.append('nombre', nombre);
      formData.append('descripcion', descripcion);
      formData.append('estatus', estatus);
      formData.append('clave_busqueda', clave_busqueda);
      console.log("guardado de fabricante:", formData);

        return await marcasApi.post(BASE_URL, formData);

    } catch (error) {
        throw error;
    }
}

export const update = async({ fabricante_id, nombre, descripcion, estatus, clave_busqueda }) => {

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data' // Establece el tipo de contenido a multipart/form-data
        }
      };
      const formData = new FormData();
      formData.append('fabricante_id', fabricante_id);
      formData.append('nombre', nombre);
      formData.append('descripcion', descripcion);
      formData.append('estatus', estatus);
      formData.append('clave_busqueda', clave_busqueda);
      console.log("guardado de fabricante:", formData);
      return await marcasApi.put(`${BASE_URL}/${fabricante_id}`, formData, config);

    } catch (error) {
        throw error;
    }
}
  