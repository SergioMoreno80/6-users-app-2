import movimientosApi from "../apis/movimientosApi";
import detallesMovimientosApi from "../apis/detallesMovimientosApi";


const BASE_URL = '';

export const findAll = async () => {
  try {
    const response = await movimientosApi.get(BASE_URL);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const findByActivoId = async (activoId) => {
  try {
    const response = await movimientosApi.get(`${BASE_URL}/activo/${activoId}`);
    console.log("API response for findByActivoId:", response.data);

    return response.data;
  } catch (error) {
    console.log("Error findByActivoId:", error);

    throw error;
  }
};

export const findAllPages = async (page = 0) => {
  try {
    const response = await movimientosApi.get(`${BASE_URL}/page/${page}`);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
//CODE FOR TESTING MODE

export const save = async ({ 
    tipo_movimiento,
    fecha_movimiento,descripcion,
    id_sucursal,
    id_departamento,
    user_id,
    empleado_id, doc,}) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data' // Establece el tipo de contenido a multipart/form-data
        }
      };
      const formData = new FormData();
      formData.append('tipo_movimiento', tipo_movimiento);
      formData.append('fecha_movimiento', fecha_movimiento);
      formData.append('descripcion', descripcion);
      formData.append('id_sucursal', id_sucursal);
      formData.append('id_departamento', id_departamento);
      formData.append('empleado_id', empleado_id);
      formData.append('user_id', user_id);

     // Agrega la imagen si está presente
     if (doc) {
      formData.append('doc', doc);
    }

    console.log("guardado de movimiento:", formData);
    return await movimientosApi.post(BASE_URL, formData);

    } catch (error) {
        throw error;
    }
}


//CODE FOR TESTING MODE
export const saveDetalles = async ({ detalle, movimientoId}) => {
  
  const detallesSimplificados = [];
  console.log("detalle ", detalle);
  console.log("mov id ", movimientoId);

  if (detalle && Array.isArray(detalle)) {
    detalle.forEach((detalleItem) => {
      const detalleSimplificado = {
        activo_id: detalleItem.activo_id,
        cantidad: 1,
        movimiento_id: movimientoId,
      };
  
      // Agregar el detalle simplificado al array
      detallesSimplificados.push(detalleSimplificado);
      });
  } 

  



  try {
    // Lógica para guardar los detalles simplificados
    // Utiliza el método saveDetalle o saveDetalles según corresponda
    console.log("dealle simplificado", detallesSimplificados);
    await saveDetallesSimplificados(detallesSimplificados);
  } catch (error) {
    throw error;
}
  

}

const saveDetallesSimplificados = async (detallesSimplificados) => {
  try {
    // Iterar sobre cada detalle simplificado y guardarlos individualmente
    console.log("dealle simplificado2", detallesSimplificados);

    await Promise.all(
      detallesSimplificados.map(async (detalle) => {
        // Lógica para guardar cada detalle
        // Utiliza el método save de tu hook useMovimiento o un servicio separado si lo tienes
        await saveDetalle(detalle);
      })
    );
  } catch (error) {
    throw error;
}
};

// const saveDetalle = async (detalle) => {
//   try {
//     console.log("dealle simplificado3", detalle);

//     return await detallesMovimientosApi.post(BASE_URL, detalle);
//   } catch (error) {
//     throw error;
//   }
// };

export const saveDetalle = async ({ activo_id, cantidad, movimiento_id }) => {
  try {
   
    const formData = new FormData();
    formData.append('activo_id', activo_id);
    formData.append('cantidad', cantidad);
    formData.append('movimiento_id', movimiento_id);
    return await detallesMovimientosApi.post(BASE_URL, formData);

      // return await detallesMovimientosApi.post(BASE_URL, {
      //   activo_id,
      //   cantidad,
      //   movimiento_id,
      // });


  } catch (error) {
      throw error;
  }
}

//GUARDADO SIN FILE IMAGE


export const update = async ({ 
    id, tipo_movimiento,
    fecha_movimiento,descripcion,
    id_sucursal,
    id_departamento,
    user_id,
    empleado_id

}) => {
  try {
    return await movimientosApi.put(`${BASE_URL}/${id}`, {
        tipo_movimiento,
    fecha_movimiento,descripcion,
    id_sucursal,
    id_departamento,
    user_id,
    empleado_id
    });
  } catch (error) {
    throw error;
  }
};

export const remove = async (id) => {
  try {
    await movimientosApi.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    throw error;
  }
};
