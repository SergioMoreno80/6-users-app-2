import { useEffect } from "react";
import { UserModalForm } from "../components/UserModalForm";
import { FabricantesList } from "../components/FabricantesList";
import React, { useState } from "react";
import { useAuth } from "../auth/hooks/useAuth";
import { useParams } from "react-router-dom";
import {
  Typography,
  Grid,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useMarcas } from "../hooks/useMarcas";
export const BrandPage = () => {
  const { page } = useParams();
  const {
    fabricantes,
    visibleForm,
    isLoading,
    paginator,
    handlerOpenForm,
    getFabricante,
    fabricanteSelected,
  } = useMarcas();
  const { login } = useAuth();
  const apiUrl = import.meta.env.VITE_IMAGE_BASE_URL;
  // useEffect(() => {
  //   getActivos(page);
  // }, [, page]);
  useEffect(() => {
    // Elimina 'page' de los parámetros de la función getActivos
    getFabricante();
  }, []);
  const generatePDF = () => {
    if (isLoading) return; // Evita la generación del PDF mientras se carga

    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    // Agregar la imagen primero
    var image1 = new Image();
    image1.onload = function () {
      const imageWidth = 100;
      const imageHeight = 100;
      const imageX = (pageWidth - imageWidth) / 2;
      const imageY = 20; // Posición en la parte superior de la página
      console.log(`Imprimiendo en ${imageX},${imageY}`);
      pdf.addImage(image1, "JPEG", imageX, imageY, imageWidth, imageHeight);

      // Información del activo
      const title = "Kardex del fabricante";
      const titleWidth =
        (pdf.getStringUnitWidth(title) * pdf.internal.getFontSize()) /
        pdf.internal.scaleFactor;
      const titleX = (pageWidth - titleWidth) / 2;
      const titleY = imageY + imageHeight + 20;
      pdf.setFontSize(18);
      pdf.text(title, titleX, titleY);
      pdf.autoTable({
        startY: titleY + 10,
        head: [["Campos", "Informacion"]],
        body: Info,
      });

      // Información de los movimientos
      pdf.addPage(); // Añadir una nueva página para los movimientos
      const movimientosTitle = "Movimientos";
      const movimientosTitleWidth =
        (pdf.getStringUnitWidth(movimientosTitle) *
          pdf.internal.getFontSize()) /
        pdf.internal.scaleFactor;
      const movimientosTitleX = (pageWidth - movimientosTitleWidth) / 2;
      pdf.setFontSize(18);
      pdf.text(movimientosTitle, movimientosTitleX, 20);
      pdf.autoTable({
        startY: 30,
        head: [
          [
            "Tipo",
            "Fecha",
            "Descripcion",
            "Sucursal",
            "Departamento",
            "Usuario",
          ],
        ],
        body: movimientoData,
      });

      pdf.save("fabricante_y_movimientos.pdf");
    };
    //image1.src = "http://ec2-3-141-190-125.us-east-2.compute.amazonaws.com:8080/imagenes/" + activoSelected.foto;
    image1.src = `${apiUrl}/` + fabricanteSelected.foto;

  };
  if (isLoading) {
    return (
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <CircularProgress />
      </div>
    );
  }
  return (
    <>
      {!visibleForm || <UserModalForm />}
      
      <div className="container my-4 text-center">
        <h2>Listado de fabricantes</h2>
        <div className="row">
          <div className="col">
            {fabricantes.length === 0 ? (
              <div className="alert alert-warning">
                No hay fabricantes en el sistema!
              </div>
            ) : (
              <>
                <FabricantesList />
                {/* <PaginatorA url="/activos/page" paginator={paginator}
                  /> */}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
