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
  const apiUrl = import.meta.env.VITE_IMAGE_BASE_URL;


  // useEffect(() => {
  //   getActivos(page);
  // }, [, page]);
  useEffect(() => {
    // Elimina 'page' de los parámetros de la función getActivos
    getList();
  }, []);
  
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
