//Define un servicio para realizar la llamada a la API y cargar las sucursales.
// src/services/sucursalesService.js
import proveedorApi from "../apis/proveedorApi";

const BASE_URL = '';

  export const findAll = async () => {
    try {
      const response = await proveedorApi.get(BASE_URL);
      return response;
    } catch (error) {
      throw new Error('Error al cargar los proveedores(findAll) ');
    }
  };

export const save = async ({ nombre, descripcion, estatus }) => {
    try {
      const formData = new FormData();
      formData.append('nombre', nombre);
      formData.append('descripcion', descripcion);
      formData.append('estatus', estatus);
      console.log("guardado de proveedores:", formData);
        return await proveedorApi.post(BASE_URL, formData);
    } catch (error) {
        throw error;
    }
}

export const update = async({ proveedor_id, nombre, descripcion, estatus }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data' // Establece el tipo de contenido a multipart/form-data
        }
      };
      const formData = new FormData();
      formData.append('proveedor_id', proveedor_id);
      formData.append('nombre', nombre);
      formData.append('descripcion', descripcion);
      formData.append('estatus', estatus);
      console.log("guardado de proveedor:", formData);
      return await proveedorApi.put(`${BASE_URL}/${proveedor_id}`, formData, config);
        // return await proveedorApi.put(`${BASE_URL}/${id}`, {
        //     nombre,
        //     descripcion,
        //     estatus,
        // });
    } catch (error) {
        throw error;
    }
}


  