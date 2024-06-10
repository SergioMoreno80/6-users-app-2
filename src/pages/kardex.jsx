import { useEffect, useState } from "react";
import { UserModalForm } from "../components/UserModalForm";
import { KardexList } from "../pages/kardexList";
import { useMovimientos } from "../hooks/useMovimientos";
import { useActivos } from "../hooks/useActivos";
import { useParams } from "react-router-dom";
import { useAuth } from "../auth/hooks/useAuth";
import {
  Typography,
  Grid,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import jsPDF from "jspdf";
import "jspdf-autotable";
export const Kardex = () => {
  const { activos = [], initialActivoForm } = useActivos();
  const [activoSelected, setActivoSelected] = useState(initialActivoForm);
  const { id, page } = useParams();

  const {
    movimientos,
    visibleForm,
    isLoading,
    paginator,
    handlerOpenForm,
    getMovimientos,
  } = useMovimientos();

  const { login } = useAuth();

  useEffect(() => {
    getMovimientos(page);
  }, [, page]);

  useEffect(() => {
    console.log("activo es: ", id);
    if (id) {
      const activo =
        activos.find((u) => u.activo_id == id) || initialActivoForm;
      console.log("activo: ", activo);

      setActivoSelected(activo);
    }
  }, [id]);

  useEffect(() => {
    console.log("activo es: ", id);
    if (id) {
      const activo =
        activos.find((u) => u.activo_id == id) || initialActivoForm;
      console.log("activo: ", activo);

      setActivoSelected(activo);
    }
  }, [id]);
  const apiUrl = import.meta.env.VITE_IMAGE_BASE_URL;
  const getFormattedDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
  };
  const generatePDF = () => {
    if (isLoading) return; // Evita la generación del PDF mientras se carga

    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    let barcodeData;
    try {
      const canvas = document.createElement("canvas");
      JsBarcode(canvas, activoSelected.clave_busqueda);
      barcodeData = canvas.toDataURL();
    } catch (error) {
      console.error("Error al generar el código de barras:", error);
      barcodeData = ""; // Si hay un error, dejar el código de barras en blanco
    }
    // Agregar la imagen primero
    var image1 = new Image();
    image1.onload = function () {
      const imageWidth = 100;
      const imageHeight = 100;
      const imageX = (pageWidth - imageWidth) / 2;
      const imageY = 20; // Posición en la parte superior de la página
      console.log(`Imprimiendo en ${imageX},${imageY}`);
      pdf.addImage(image1, "JPEG", imageX, imageY, imageWidth, imageHeight);
      // Agregar el código de barras debajo de la imagen
      const barcodeWidth = 50; // Ancho del código de barras más pequeño
      const barcodeHeight = 30; // Altura del código de barras más pequeño
      const barcodeX = (pageWidth - barcodeWidth) / 2;
      const barcodeY = imageY + imageHeight + 10; // Espacio entre la imagen y el código de barras
      pdf.addImage(
        barcodeData,
        "PNG",
        barcodeX,
        barcodeY,
        barcodeWidth,
        barcodeHeight
      );

      // Información del activo
      const title = "Kardex del activo";
      const titleWidth =
        (pdf.getStringUnitWidth(title) * pdf.internal.getFontSize()) /
        pdf.internal.scaleFactor;
      const titleX = (pageWidth - titleWidth) / 2;
      const titleY = imageY + imageHeight + 20;
      pdf.setFontSize(18);
      //pdf.text(title, titleX, titleY);
      // Información del activo (tabla)
      const tableX = 10; // Ajusta la posición X de la tabla según sea necesario
      const tableY = titleY + 10; // Espacio entre el título y la tabla
      pdf.autoTable({
        startY: titleY + 30,
        head: [["Campos", "Informacion"]],
        body: activoInfo,
        margin: { top: tableY }
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
      const formattedDateTime = getFormattedDateTime();
      const fileName = `activo_y_movimientos_${formattedDateTime}.pdf`;
      pdf.save(fileName);
    };
    image1.src =  apiUrl + "/"+ activoSelected.foto;
  };
  const formatDate = (dateString) => {
    if (!dateString) return ""; // Verificar si la cadena de fecha está vacía
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString(); // Formatear la fecha según la configuración regional del navegador
    return formattedDate;
  };

  const formatCurrency = (amount) => {
    if (!amount) return ""; // Verificar si el importe está definido

    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(amount);
  };
  const activoInfo = [
    ["Nombre", activoSelected.nombre],
    ["Descripción", activoSelected.descripcion],
    ["Proveedor", activoSelected.proveedor],
    ["No. de Serie", activoSelected.no_serie],
    ["Factura", activoSelected.factura],
    ["Fecha de Compra", formatDate(activoSelected.fecha_compra)],
    ["Costo", formatCurrency(activoSelected.importe)],
  ];

  const movimientoData = movimientos.map((movimiento) => [
    movimiento.tipo_movimiento,
    formatDate(movimiento.fecha_movimiento),
    movimiento.descripcion,
    movimiento.id_sucursal,
    movimiento.id_departamento,
    movimiento.empleado_id,
  ]);

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
      <Typography
        variant="h4"
        color="black"
        align="center"
        gutterBottom
        style={{ marginTop: "100px" }}
      >
        KARDEX DEL ACTIVO
      </Typography>

      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            // src={`http://ec2-3-141-190-125.us-east-2.compute.amazonaws.com:8080/imagenes/${activoSelected.foto}`}
            src={`${apiUrl}/${activoSelected.foto}`} // Concatenación correcta

            alt={activoSelected.nombre}
            className="img-fluid"
            style={{
              maxWidth: "250px",
              height: "250px",
              marginBottom: "20px",
            }}
          />
          <Button variant="contained" color="primary" onClick={generatePDF}>
            Descargar PDF
          </Button>
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                label="Nombre"
                variant="outlined"
                fullWidth
                value={activoSelected.nombre}
                disabled
                style={{ marginBottom: "8px" }}
              />
              <TextField
                label="Descripción"
                variant="outlined"
                fullWidth
                value={activoSelected.descripcion}
                disabled
                style={{ marginBottom: "8px" }}
              />
              <TextField
                label="Proveedor"
                variant="outlined"
                fullWidth
                value={activoSelected.proveedor}
                disabled
                style={{ marginBottom: "8px" }}
              />
              <TextField
                label="No. de Serie"
                variant="outlined"
                fullWidth
                value={activoSelected.no_serie}
                disabled
                style={{ marginBottom: "8px" }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Factura"
                variant="outlined"
                fullWidth
                value={activoSelected.factura}
                disabled
                style={{ marginBottom: "8px" }}
              />
              <TextField
                label="Fecha de Compra"
                variant="outlined"
                fullWidth
                value={formatDate(activoSelected.fecha_compra)}
                disabled
                style={{ marginBottom: "8px" }}
              />
              <TextField
                label="Costo"
                variant="outlined"
                fullWidth
                value={formatCurrency(activoSelected.importe)}
                disabled
                style={{ marginBottom: "8px" }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <hr />
      <Typography variant="h4" color="primary" align="center" gutterBottom>
        MOVIMIENTOS
      </Typography>
      {movimientos.length === 0 ? (
        <div className="alert alert-warning text-center">
          No hay movimientos en el sistema.
        </div>
      ) : (
        <>
          <Grid item xs={12} md={8} style={{ paddingLeft: "35px" }}>
          <KardexList activo={activoSelected} />
          </Grid>
        </>
      )}
    </>
  );
};
