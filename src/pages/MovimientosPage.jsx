import { useEffect } from "react";
import { UserModalForm } from "../components/UserModalForm";
import { MovimientosList } from "../components/MovimientosList";
import { useMovimientos } from "../hooks/useMovimientos";
import { useAuth } from "../auth/hooks/useAuth";
import { useParams } from "react-router-dom";
import { PaginatorA } from "../components/PaginatorA";

export const MovimientosPage = () => {
  const { page } = useParams();
  const {
    movimientos,
    visibleForm,
    isLoading,
    paginator,
    handlerOpenForm,
    //getMovimientos,
    getListMov,
  } = useMovimientos();

  const { login } = useAuth();

  // useEffect(() => {
  //   getMovimientos(page);
  // }, [, page]);
  useEffect(() => {
    // Elimina 'page' de los parámetros de la función getActivos
    getListMov();
  }, []);

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
        <h2>MOVIMIENTOS</h2>

        <div className="row">
        <div className="col">

            {movimientos.length === 0 ? (
              <div className="alert alert-warning">
                No hay movimientos en el sistema!
              </div>
            ) : (
              <>
                <MovimientosList />
                  {/* <PaginatorA url="/movimientos/page" paginator={paginator}
                  />
                */}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
