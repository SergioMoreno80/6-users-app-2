import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { BrandRegister } from "./BrandRegister";
import { useMarcas } from "../hooks/useMarcas";

export const BrandReg = () => {

    const { fabricantes = [], initialForm } = useMarcas();

    const [fabricanteSelected, setFabricanteSelected] = useState(initialForm);

    const { id } = useParams();

    useEffect(() => {
        console.log("Fabricante Reg",id);
        if (id) {
            const fab = fabricantes.find(u => u.fabricante_id == id) || initialForm;
            console.log('Información de fabricante:', fab);
            setFabricanteSelected(fab);

        }
    }, [id])

    return (
        <div className="container my-4">
            <h4>{ fabricanteSelected.fabricante_id > 0 ? 'Editar' : 'Registrar'} Fabricante</h4>
            <div className="row">
                <div className="col">
                    <BrandRegister fabricanteSelected={fabricanteSelected} />
                </div>
            </div>
        </div>
    )
}