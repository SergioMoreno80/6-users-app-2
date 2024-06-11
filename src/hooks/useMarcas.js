import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { findAll, save, update } from "../services/marcasService";
import { useDispatch, useSelector } from "react-redux";
import { 
    initialForm,
    addFabricante,
  removeFabricante,
  updateFabricante,
  loadingData,
  onSelectedForm,
  onOpenForm,
  onCloseForm,
    loadingError,} from "../store/slices/marcas/marcasSlice";

import { useAuth } from "../auth/hooks/useAuth";

export const useMarcas = () => {
    
    const { fabricantes, fabricanteSelected, visibleForm, errors, isLoading, paginator } = useSelector(state => state.fabricantes);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { login, handlerLogout } = useAuth();

    const getFabricante = async (page = 0) => {
        try {
          const result = await findAll(page);
          console.log("login fabricante:",result);
    
          dispatch(loadingData(result.data));
        } catch (error) {
          if (error.response?.status == 401) {
            handlerLogout();
          }
        }
      };

    const handlerAddFabricante = async (fab) => {
        // console.log(fab);

        if (!login.isAdmin) return;

        let response;
        try {

            if (fab.fabricante_id === 0) {
                response = await save(fab);
                dispatch(addFabricante(response.data))
            } else {
                response = await update(fab);
                dispatch(updateFabricante(response.data));
            }

            Swal.fire(
                (fab.fabricante_id === 0) ?
                    'Fabricante Creado' :
                    'Fabricante Actualizado',
                (fab.fabricante_id === 0) ?
                    'El Fabricante ha sido creado con exito!' :
                    'El Fabricante ha sido actualizado con exito!',
                'success'
            );
            handlerCloseForm();
            navigate('/fabricantes');
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

    const handlerRemoveFabricante = (id) => {
        // console.log(id);

        if (!login.isAdmin) return;

        Swal.fire({
            title: 'Esta seguro que desea eliminar?',
            text: "Cuidado el fabricante sera eliminado!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!'
        }).then( async(result) => {
            if (result.isConfirmed) {

                try {
                    await remove(id);

                    dispatch(removeFabricante(id));

                    Swal.fire(
                        'Fabricante Eliminado!',
                        'El Fabricante ha sido eliminado con exito!',
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

    const handlerFabricanteSelectedForm = (prov) => {
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
        fabricantes,
        fabricanteSelected,
        initialForm,
        visibleForm,
        errors,
        isLoading,
        paginator,
        handlerAddFabricante,
        handlerRemoveFabricante,
        handlerFabricanteSelectedForm,
        handlerOpenForm,
        handlerCloseForm,
        getFabricante,
        }
}