import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { ProveedorRegister } from "./ProveedorRegister";
import { useProveedores } from "../hooks/useProveedores";

export const ProveedorReg = () => {

    const { proveedor = [], initialForm } = useProveedores();

    const [proveedorSelected, setProveedorSelected] = useState(initialForm);

    const { id } = useParams();

    useEffect(() => {
        console.log("Proveedor Reg",id);
        if (id) {
            const prov = proveedor.find(u => u.proveedor_id == id) || initialForm;
            console.log('Información de proveedor:', prov);
            setProveedorSelected(prov);

        }
    }, [id])

    return (
        <div className="container my-4">
            <h4>{ proveedorSelected.proveedor_id > 0 ? 'Editar' : 'Registrar'} Proveedor</h4>
            <div className="row">
                <div className="col">
                    <ProveedorRegister proveedorSelected={proveedorSelected} />
                </div>
            </div>
        </div>
    )
}