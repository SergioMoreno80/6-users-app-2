import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { useActivos } from "../hooks/useActivos";
import { AssetRegister } from "./AssetRegister";

export const AssetReg = () => {

    const { activos = [], initialActivoForm } = useActivos();

    const [activoSelected, setActivoSelected] = useState(initialActivoForm);

    const { id } = useParams();

    useEffect(() => {
        console.log("AssetReg",id);
        if (id) {
            const activo = activos.find(u => u.activo_id == id) || initialActivoForm;
            console.log('Información de activo:', activo);
            setActivoSelected(activo);

        }
    }, [id])

    return (
        <div className="container my-4">
            <h4>{ activoSelected.activo_id > 0 ? 'Editar' : 'Registrar'} Activo</h4>
            <div className="row">
                <div className="col">
                    <AssetRegister activoSelected={activoSelected} />
                </div>
            </div>
        </div>
    )
}