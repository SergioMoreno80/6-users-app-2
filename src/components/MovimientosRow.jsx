import React, { useState, useEffect } from "react";
import { TableRow, TableCell, Button } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { format } from "date-fns";
import jsPDF from "jspdf";
import JsBarcode from "jsbarcode";
import { useMovimientos } from "../hooks/useMovimientos";
import logo from "../images/logoflosamed.png"; // Ajusta la ruta a tu imagen de logotipo

const MovimientosRow = ({ movimiento }) => {
  const {
    detallesByMovimiento,
    getListByMov,
  } = useMovimientos();

  const [loading, setLoading] = useState(false); // Estado para controlar la carga

  useEffect(() => {
    if (movimiento.id) {
      // Cargar los detalles de movimiento al montar o actualizar el movimiento.id
      setLoading(true);
      getListByMov(movimiento.id)
        .then(() => setLoading(false))
        .catch((error) => {
          console.error("Error al cargar detalles de movimiento:", error);
          setLoading(false);
        });
    }
  }, [movimiento.id]);

  const getFormattedDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
  };

  const handleGeneratePDF = () => {
    if (!detallesByMovimiento || detallesByMovimiento.length === 0) {
      throw new Error("No hay detalles de movimiento disponibles.");
    }

    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const title = "Carta Responsiva de Activos";

    // Título
    pdf.setFontSize(18);
    const titleWidth =
      (pdf.getStringUnitWidth(title) * pdf.internal.getFontSize()) /
      pdf.internal.scaleFactor;
    const titleX = (pageWidth - titleWidth) / 2;
    pdf.text(title, titleX, 20);

    // Encabezado con 4 columnas
    const headerData = [
      [
        { image: logo, width: 50, height: 50 }, // Logo o imagen en la primera columna
        "                                     ",
        "Código",
        "ARH-HUM-F-17",
      ],
      ["", "", "Revision:", "00"],
      ["", "", "Vigencia:", ""],
      ["", "", "Fecha:", format(new Date(), "dd/MM/yyyy")], // Fecha de hoy
    ];

    const headerTableConfig = {
      startY: 40, // Ajustar la posición inicial para dejar espacio para el logo
      head: [["", "", "", ""]],
      body: headerData,
      margin: { top: 10 },
      theme: "plain", // Opcional: estilo del pie de página
      didParseCell: function (data) {
        if (data.column.index === 0 && data.cell.raw && data.cell.raw.image) {
          const { x, y, width, height } = data.cell;
          pdf.addImage(
            data.cell.raw.image,
            "PNG",
            x + 5,
            y + 5,
            width - 10,
            height - 10
          );
          data.cell.text = ""; // Asegurarse de que no haya texto en la celda
        }
      },
    };

    // Configuración especial para combinar celdas en las primeras dos columnas
    const combineCells = [
      { row: 0, col: 0, rowspan: 3, colspan: 1 },
      { row: 0, col: 1, rowspan: 3, colspan: 1 },
    ];

    pdf.autoTable({
      ...headerTableConfig,
      didParseCell: function (data) {
        if (
          combineCells.some(
            (cell) =>
              cell.row === data.row.index && cell.col === data.column.index
          )
        ) {
          // Verificar si data.cell.raw es una cadena y convertirla en un objeto si es necesario
          if (typeof data.cell.raw === "string") {
            data.cell.raw = {}; // Inicializar como objeto si es una cadena vacía
          }
          // Asignar colSpan y rowSpan directamente al objeto data.cell.raw
          data.cell.raw.colSpan = combineCells.find(
            (cell) =>
              cell.row === data.row.index && cell.col === data.column.index
          ).colspan;
          data.cell.raw.rowSpan = combineCells.find(
            (cell) =>
              cell.row === data.row.index && cell.col === data.column.index
          ).rowspan;
        }

        // Renderizar la imagen correctamente si es la celda de la imagen
        if (data.column.index === 0 && data.cell.raw && data.cell.raw.image) {
          const { x, y, width, height } = data.cell;
          pdf.addImage(
            data.cell.raw.image,
            "PNG",
            x + 2,
            y + 2,
            width - 4,
            height - 4
          );
          data.cell.text = ""; // Asegurarse de que no haya texto en la celda
        }
      },
    });

    // Datos del movimiento
    const movimientoData = [
      ["Folio del Movimiento", movimiento.id],
      ["Nombre del Empleado", movimiento.empleado.nombre],
      ["Cargo", movimiento.empleado.cargo],
      ["Departamento", movimiento.departamentos.nombre],
      [
        "Fecha de Ingreso",
        format(new Date(movimiento.empleado.fecha_ingreso), "dd/MM/yyyy"),
      ],
      ["No. de Empleado", movimiento.empleado.clave_busqueda],
    ];

    // Configuración de autoTable para datos del movimiento
    const movimientoTableConfig = {
      startY: pdf.autoTable.previous.finalY + 5,
      head: [["Campo", "Información"]],
      body: movimientoData,
      margin: { top: 25 },
    };

    pdf.autoTable(movimientoTableConfig);

    // Espacio antes de la siguiente tabla
    pdf.text("", 10, pdf.autoTable.previous.finalY + 10);

    // Título para detalles de movimiento
    const detallesTitle = "Detalles de Movimientos";
    pdf.setFontSize(18);
    const detallesTitleWidth =
      (pdf.getStringUnitWidth(detallesTitle) * pdf.internal.getFontSize()) /
      pdf.internal.scaleFactor;
    const detallesTitleX = (pageWidth - detallesTitleWidth) / 2;
    pdf.text(detallesTitle, detallesTitleX, pdf.autoTable.previous.finalY + 15);

    const rows = detallesByMovimiento.map((detalle) => {
      let barcodeData;
      try {
        const canvas = document.createElement("canvas");
        JsBarcode(canvas, detalle.activo.clave_busqueda);
        barcodeData = canvas.toDataURL();
      } catch (error) {
        console.error("Error al generar el código de barras:", error);
        barcodeData = ""; // Si hay un error, dejar el código de barras en blanco
      }

      return [
        detalle.activo.nombre,
        detalle.activo.modelo,
        detalle.activo.no_serie,
        { content: "", image: barcodeData, width: 100, height: 50 }, // Inicializar correctamente la celda de la imagen
      ];
    });

    // Configuración de autoTable para detalles de movimiento
    const detallesTableConfig = {
      startY: pdf.autoTable.previous.finalY + 25,
      head: [["Nombre", "Modelo", "Serie", "   Código"]],
      body: rows,
      margin: { top: 25 },
      didDrawCell: (data) => {
        // Verificar si es la celda de la imagen y renderizar la imagen correctamente
        if (
          data.column.index === 3 &&
          data.cell.raw &&
          data.cell.raw.image
        ) {
          const { x, y, width, height } = data.cell;
          pdf.addImage(
            data.cell.raw.image,
            "PNG",
            x + 2,
            y + 2,
            width - 4,
            height - 4
          );
          data.cell.text = ""; // Asegurarse de que no haya texto en la celda
        }
      },
      headStyles: {
        fontSize: 10, // Tamaño de letra para el encabezado
      },
      bodyStyles: {
        fontSize: 8, // Tamaño de letra para el cuerpo
        cellPadding: 1,
        minCellHeight: 30,
      },
    };

    pdf.autoTable(detallesTableConfig);

    // Pie de página
    const pieDePagina = [
      [
        "Manifiesto que, a partir de esta fecha el equipo aquí descrito, queda bajo mi custodia y responsabilidad. Me obligo a informar por escrito al área de recursos humanos y sistemas de todos los movimientos que efectúe de dichos bienes. Acepto que se tomen las medidas necesarias por parte de Grupo Flosamed. De Conformidad a lo dispuesto por las fracciones III y IX del articulo 135 y demas de la Ley Federal de Trabajo.",
      ],
    ];

    const pieDePaginaConfig = {
      startY: pdf.internal.pageSize.height - 20, // Colocar al final de la página
      head: [["TRANSFERENCIA DEL ACTIVO FIJO AL USUARIO"]],
      body: pieDePagina,
      theme: "plain", // Opcional: estilo del pie de página
      didParseCell: (data) => {
        // Ajustar el ancho de las columnas para centrarlas
        data.cell.styles.cellWidth = "wrap";
      },
    };

    pdf.autoTable(pieDePaginaConfig);

    // Sección de firmas
    const sectionFirmas = [["NOMBRE Y FIRMA", "NOMBRE Y FIRMA"]];

    const firmasConfig = {
      startY: pdf.autoTable.previous.finalY + 15, // Alinear después del pie de página
      head: [["RECIBÍ EQUIPO", "VO.BO"]],
      body: sectionFirmas,
      theme: "plain", // Opcional: estilo del pie de página
      didParseCell: (data) => {
        // Ajustar el ancho de las columnas para centrarlas
        data.cell.styles.cellWidth = "wrap";
        if (data.column.index === 0) {
          data.cell.styles.halign = "center";
        } else if (data.column.index === 1) {
          data.cell.styles.halign = "center";
        }
      },
    };

    pdf.autoTable(firmasConfig);

    // Generar nombre del archivo y descargar
    const fileName = `movimiento_${movimiento.id}_${getFormattedDateTime()}.pdf`;
    pdf.save(fileName);
  };

  return (
    <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
      <TableCell align="center">{movimiento.id}</TableCell>
      <TableCell align="center">{movimiento.tipo_movimiento}</TableCell>
      <TableCell align="center">
        {format(new Date(movimiento.fecha_movimiento), "dd/MM/yyyy")}
      </TableCell>
      <TableCell align="center">{movimiento.descripcion}</TableCell>
      <TableCell align="center">{movimiento.sucursales.nombre}</TableCell>
      <TableCell align="center">{movimiento.departamentos.nombre}</TableCell>
      <TableCell align="center">{movimiento.empleado.nombre}</TableCell>
      <TableCell align="center">
        <Button
          variant="contained"
          color="primary"
          onClick={handleGeneratePDF}
          startIcon={<PictureAsPdfIcon />}
        >
          Generar PDF
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default MovimientosRow;
