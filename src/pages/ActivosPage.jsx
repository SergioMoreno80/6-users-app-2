import { useEffect } from "react";
import { UserModalForm } from "../components/UserModalForm";
import { ActivosList } from "../components/ActivosList";
import React, { useState } from "react";
import { useActivos } from "../hooks/useActivos";
import { useAuth } from "../auth/hooks/useAuth";
import { useParams } from "react-router-dom";
import { PaginatorA } from "../components/PaginatorA";
import {
  Typography,
  Grid,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import jsPDF from "jspdf";
import "jspdf-autotable";
export const ActivosPage = () => {
  const { page } = useParams();
  const {
    activos,
    visibleForm,
    isLoading,
    paginator,
    handlerOpenForm,
    getActivos,
    getList,
    activoSelected,
  } = useActivos();
  const { login } = useAuth();

  // useEffect(() => {
  //   getActivos(page);
  // }, [, page]);
  useEffect(() => {
    // Elimina 'page' de los parámetros de la función getActivos
    getList();
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
      const title = "Kardex del activo";
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
        body: activoInfo,
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

      pdf.save("activo_y_movimientos.pdf");
    };
    image1.src = "http://localhost:8080/imagenes/" + activoSelected.foto;
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
      {/* <Typography
        variant="h4"
        color="black"
        align="center"
        gutterBottom
        style={{ marginTop: "100px" }}
      >
        KARDEX DEL 
      </Typography> */}
      
      <div className="container my-4 text-center">
        <h2>Listado de activos</h2>
        <div className="row">
          <div className="col">
            {activos.length === 0 ? (
              <div className="alert alert-warning">
                No hay activos en el sistema!
              </div>
            ) : (
              <>
                <ActivosList />
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
