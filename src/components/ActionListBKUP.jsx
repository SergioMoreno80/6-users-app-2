import { ActivoRow } from "./ActivoRow"
import { useActivos } from "../hooks/useActivos";
import { useAuth } from "../auth/hooks/useAuth";

export const ActivosList = () => {

    const { activos } = useActivos();
    const { login } = useAuth();
    return (
        
        <table className="table table-hover table-striped">

            <thead>
                <tr>
                    <th>#</th>
                    <th>nombre</th>
                    <th>descripcion</th>
                    {!login.isAdmin || <>
                        <th>update</th>
                        <th>update route</th>
                        <th>remove</th>
                    </>}
                </tr>
            </thead>
            <tbody>
                {
                    activos.map(({ activo_id, nombre, descripcion }) => (
                        <ActivoRow
                            key={activo_id}
                            id={activo_id}
                            nombre={nombre}
                            descripcion={descripcion}
                            //admin={admin}
                        />
                    ))
                }
            </tbody>
        </table>
    )
}