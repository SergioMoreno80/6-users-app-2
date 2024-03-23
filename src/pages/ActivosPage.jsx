import { useEffect } from "react";
import { UserModalForm } from "../components/UserModalForm";
import { ActivosList } from "../components/ActivosList";
import { useActivos } from "../hooks/useActivos";
import { useAuth } from "../auth/hooks/useAuth";
import { useParams } from "react-router-dom";
import { PaginatorA } from "../components/PaginatorA";

export const ActivosPage = () => {
  const { page } = useParams();
  const {
    activos,
    visibleForm,
    isLoading,
    paginator,
    handlerOpenForm,
    getActivos,
  } = useActivos();

  const { login } = useAuth();

  useEffect(() => {
    getActivos(page);
  }, [, page]);

  if (isLoading) {
    return (
      <div className="container my-4 text-center">
        {/* <h4>Cargando ...</h4> */}
        <div className="spinner-border text-info" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  return (
    <>
      {!visibleForm || <UserModalForm />}
      <div className="container my-4 text-center">
        <h2>Listado de activos</h2>

        <div className="row">
        <div className="col">
            
            {/* {visibleForm || !login.isAdmin || (
              <button
                className="btn btn-primary my-2"
                onClick={handlerOpenForm}
              >
                Nuevo activo
              </button>
            )} */}

            {activos.length === 0 ? (
              <div className="alert alert-warning">
                No hay activos en el sistema!
              </div>
            ) : (
              <>
                <ActivosList />
                  <PaginatorA url="/activos/page" paginator={paginator}
                  />
               
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
