import { Navigate, Route, Routes } from "react-router-dom";
//import { Navbar } from "../components/layout/Navbar"
import { MiniDrawer } from "../components/layout/MiniDrawer";
import { RegisterPage } from "../pages/RegisterPage";
import { BrandPage } from "../pages/BrandPage";
import { AssetGroup } from "../pages/AssetGroup";
import { AssetType } from "../pages/AssetType";
import { AssetPage } from "../pages/AssetPage";
import { DashAsset } from "../pages/DashAsset";
import { AssetList } from "../pages/AssetList";
import { UsersPage } from "../pages/UsersPage";
import { ActivosPage } from "../pages/activosPage";
import { MovimientosPage } from "../pages/MovimientosPage";
import { useSelector } from "react-redux";
import { Personal } from "../pages/Personal";

import { AssignAsset } from "../pages/AssignAsset";
import { LendAsset } from "../pages/LendAsset";
import { MaintenanceAsset } from "../pages/MaintenanceAsset";
import { AssetOut } from "../pages/AssetOut";
//import { FormularioEjemplo } from "../pages/FormularioEjemplo";
import { AssetRegister } from "../pages/AssetRegister";
import { AssetReg } from "../pages/AssetReg";


export const UserRoutes = () => {
  const { isAdmin } = useSelector((state) => state.auth);
  return (
    <>
      <MiniDrawer />

      <Routes>
        <Route path="movimientos" element={<MovimientosPage />} />
        <Route path="activos" element={<ActivosPage />} />
        <Route path="AssetDash/Dashboard" element={<DashAsset />} />
        <Route path="brand/register" element={<BrandPage />} />
        <Route path="AssetGroup/register" element={<AssetGroup />} />
        <Route path="AssetType/register" element={<AssetType />} />
        {/* <Route path="AssetPage/register" element={<AssetPage />} /> */}
        <Route path="AssetList" element={<AssetList />} />
        <Route path="Personal/Table" element={<Personal />} />
        <Route path="AssignAsset/process" element={<AssignAsset />} />
        {/* <Route path="LendAsset/process" element={<LendAsset />} /> */}
        <Route path="MaintenanceAsset/process" element={<MaintenanceAsset />} />
        <Route path="AssetOut/process" element={<AssetOut />} />
        <Route path="AssetPage/register" element={<AssetRegister />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="users/page/:page" element={<UsersPage />} />
        <Route path="activos/page/:page" element={<ActivosPage />} />
        <Route path="movimientos/page/:page" element={<MovimientosPage />} />
        {/* <Route path="AssetDash/Dashboard/:page" element={<DashAsset />} /> */}

        {!isAdmin || (
          <>
            <Route path="users/register" element={<RegisterPage />} />
            <Route path="users/edit/:id" element={<RegisterPage />} />
            <Route path="Assets/edit/:id" element={<AssetReg />} />


          </>
        )}
        <Route path="/" element={<Navigate to="/AssetPage/register" />} />
      </Routes>
    </>
  );
};
