import { useEffect } from "react";
import { UserModalForm } from "../components/UserModalForm";
import { MovimientosList } from "../components/MovimientosList";
import { useMovimientos } from "../hooks/useMovimientos";
import { useAuth } from "../auth/hooks/useAuth";
import { useParams, NavLink } from "react-router-dom"; // Importa NavLink
import { PaginatorA } from "../components/PaginatorA";

export const MovimientosPage = () => {
  const { page } = useParams();
  const {
    movimientos,
    visibleForm,
    isLoading,
    getListMov,
  } = useMovimientos();

  const { login } = useAuth();

  useEffect(() => {
    getListMov();
  }, []);

  if (isLoading) {
    return (
      <div className="container my-4 text-center">
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
                <br />
                <NavLink to="/AssignAsset/process" className="btn btn-primary mt-3">
                  Agregar Asignación
                </NavLink>
              </div>
            ) : (
              <>
                <MovimientosList />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
