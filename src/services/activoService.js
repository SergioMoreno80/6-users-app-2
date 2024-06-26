import activosApi from "../apis/activosApi";

const BASE_URL = '';

export const findAll = async () => {
  try {
    const response = await activosApi.get(BASE_URL);
    return response;
  } catch (error) {
    throw new Error('Error al cargar los activos(findAll) ');
  }
};

export const findAllPages = async (page = 0) => {
  try {
    const response = await activosApi.get(`${BASE_URL}/page/${page}`);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//CODE FOR TESTING MODE
export const save = async ({ 
  nombre,
  descripcion,
  fabricante_id,
  modelo,
  no_serie,
  clasificacion,
  grupoactivo_id,
  proveedor_id,
  factura,
  estatus,
  clave_busqueda,
  importe,
  fecha_compra,
  fecha_ingreso, imagen, doc}) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data' // Establece el tipo de contenido a multipart/form-data
      }
    };
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);
    formData.append('fabricante_id', fabricante_id);
    formData.append('modelo', modelo);
    formData.append('no_serie', no_serie);
    formData.append('clasificacion', clasificacion);
    formData.append('grupoactivo_id', grupoactivo_id);
    formData.append('proveedor_id', proveedor_id);
    formData.append('factura', factura);
    formData.append('estatus', estatus);
    formData.append('clave_busqueda', clave_busqueda);
    formData.append('importe', importe);
    formData.append('fecha_compra', fecha_compra);
    formData.append('fecha_ingreso', fecha_ingreso);
    
     // Agrega la imagen si está presente
     if (imagen) {
      formData.append('imagen', imagen);
    }
    if (doc) {
      formData.append('doc', doc);
    }
    return await activosApi.post(BASE_URL, formData);
      //return await activosApi.post(BASE_URL, formData, config);
  } catch (error) {
    console.error('Error al guardar el activo:', error.message);
    throw error;
  }
}
//GUARDADO SIN FILE IMAGE
export const save2 = async ({
  nombre,
  descripcion,
  fabricante_id,
  modelo,
  no_serie,
  clasificacion,
  grupoactivo_id,
  proveedor_id,
  factura,
  estatus,
  clave_busqueda,
  importe,
  fecha_compra,
  fecha_ingreso,
  imagen
}) => {
  try {
    
    const formData = new FormData();
    formData.append('activo', JSON.stringify({
      nombre,
      descripcion,
      fabricante_id,
      modelo,
      no_serie,
      clasificacion,
      grupoactivo_id,
      proveedor_id,
      factura,
      estatus,
      clave_busqueda,
      importe,
      fecha_compra,
      fecha_ingreso,
      //admin,
    }));

        return await activosApi.post(BASE_URL,formData, 
        {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    );
  } catch (error) {
    if (error.response.status === 403) {
      // Manejar el error 403
      console.error('Acceso prohibido:', error.message);
    } else {
      // Manejar otros errores
      console.error('Error en la solicitud:', error.message);
    }
    throw error;
  }
};

export const update2 = async ({ 
    activo_id, nombre,
    descripcion,
    fabricante_id,
    modelo,
    no_serie,
    clasificacion,
    grupoactivo_id,
    proveedor_id,
    factura,
    estatus,
    clave_busqueda,
    importe,
    fecha_compra,
    fecha_ingreso,
    imagen,
    doc

}) => {
  try {
    return await activosApi.put(`${BASE_URL}/${activo_id}`, {
        nombre,
        descripcion,
        fabricante_id,
        modelo,
        no_serie,
        clasificacion,
        grupoactivo_id,
        proveedor_id,
        factura,
        estatus,
        clave_busqueda,
        importe,
        fecha_compra,
        fecha_ingreso,
        imagen,
        doc
    });
  } catch (error) {
    throw error;
  }
};

export const update = async ({ 
////
activo_id,nombre,
  descripcion,
  fabricante_id,
  modelo,
  no_serie,
  clasificacion,
  grupoactivo_id,
  proveedor_id,
  factura,
  estatus,
  clave_busqueda,
  importe,
  fecha_compra,
  fecha_ingreso, imagen, doc, documento, foto}) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data' // Establece el tipo de contenido a multipart/form-data
      }
    };
    const formData = new FormData();
    formData.append('activo_id', activo_id);
    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);
    formData.append('fabricante_id', fabricante_id);
    formData.append('modelo', modelo);
    formData.append('no_serie', no_serie);
    formData.append('clasificacion', clasificacion);
    formData.append('grupoactivo_id', grupoactivo_id);
    formData.append('proveedor_id', proveedor_id);
    formData.append('factura', factura);
    formData.append('estatus', estatus);
    formData.append('clave_busqueda', clave_busqueda);
    formData.append('importe', importe);
    formData.append('fecha_compra', fecha_compra);
    formData.append('fecha_ingreso', fecha_ingreso);
    formData.append('documento', documento);
    formData.append('foto',foto);
    console.log('loadingData activo en service update', formData); 

     // Agrega la imagen si está presente
     if (imagen) {
      formData.append('imagen', imagen);
    }
    if (doc) {
      formData.append('doc', doc);
    }
    // return await activosApi.put(`${BASE_URL}/${activo_id}`, formData);
    // return await activosApi.put(BASE_URL, formData);
    return await activosApi.put(`${BASE_URL}/${activo_id}`, formData, config);

  } catch (error) {
    console.error(error);
      throw error;
  }
};

export const remove = async (id) => {
  try {
    await activosApi.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    throw error;
  }
};
