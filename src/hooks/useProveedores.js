import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { findAll, save, update } from "../services/proveedorService";
import { useDispatch, useSelector } from "react-redux";
import { 
    initialForm,
    addProveedor,
    removeProveedor,
    updateProveedor,
    loadingData,
    onSelectedForm,
    onOpenForm,
    onCloseForm,
    loadingError,} from "../store/slices/proveedores/proveedorSlice";

import { useAuth } from "../auth/hooks/useAuth";

export const useProveedores = () => {
    
    const { proveedor, proveedorSelected, visibleForm, errors, isLoading, paginator } = useSelector(state => state.proveedor);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { login, handlerLogout } = useAuth();

    const getProveedor = async (page = 0) => {
        try {
          const result = await findAll(page);
          console.log("login proveedor:",result);
    
          dispatch(loadingData(result.data));
        } catch (error) {
          if (error.response?.status == 401) {
            handlerLogout();
          }
        }
      };

    const handlerAddProveedor = async (prov) => {
        // console.log(proveedor);

        if (!login.isAdmin) return;
        let response;
        try {

            if (prov.proveedor_id === 0) {
            console.log(prov);
                response = await save(prov);
                dispatch(addProveedor(response.data))
            } else {
                response = await update(prov);
                dispatch(updateProveedor(response.data));
            }

            Swal.fire(
                (prov.proveedor_id === 0) ?
                    'proveedor Creado' :
                    'proveedor Actualizado',
                (prov.proveedor_id === 0) ?
                    'El proveedor ha sido creado con exito!' :
                    'El proveedor ha sido actualizado con exito!',
                'success'
            );
            handlerCloseForm();
            navigate('/proveedores');
        } catch (error) {
            if (error.response && error.response.status == 400) {
                dispatch(loadingError(error.response.data));
            } else if (error.response && error.response.status == 500 &&
                error.response.data?.message?.includes('constraint')) {
            
                if (error.response.data?.message?.includes('UK_nombre')) {
                    dispatch(loadingError({ username: 'El nombre ya existe!' }));
                }
              
            } else if (error.response?.status == 401) {
                handlerLogout();
            } else {
                throw error;
            }
        }
    }

    const handlerRemoveProveedor = (id) => {
        // console.log(id);

        if (!login.isAdmin) return;

        Swal.fire({
            title: 'Esta seguro que desea eliminar?',
            text: "Cuidado el proveedor sera eliminado!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!'
        }).then( async(result) => {
            if (result.isConfirmed) {

                try {
                    await remove(id);

                    dispatch(removeProveedor(id));

                    Swal.fire(
                        'Proveedor Eliminado!',
                        'El proveedor ha sido eliminado con exito!',
                        'success'
                    );
                } catch (error) {
                    if (error.response?.status == 401) {
                        handlerLogout();
                    }
                }
            }
        })

    }

    const handlerProveedorSelectedForm = (prov) => {
        dispatch(onSelectedForm({ ...prov }));
    }

    const handlerOpenForm = () => {
        dispatch(onOpenForm());
    }

    const handlerCloseForm = () => {
        dispatch(onCloseForm());
        dispatch(loadingError({}));
    }
    return {
        proveedor,
        proveedorSelected,
        initialForm,
        visibleForm,
        errors,
        isLoading,
        paginator,
        handlerAddProveedor,
        handlerRemoveProveedor,
        handlerProveedorSelectedForm,
        handlerOpenForm,
        handlerCloseForm,
        getProveedor,
        }
}