//import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";
import logo from "../../images/logoflosamed.png"; // Ajusta la ruta a tu imagen de logotipo

import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  AccountTree,
  Addchart,
  Apartment,
  AppRegistration,
  BrandingWatermark,
  BrandingWatermarkRounded,
  EmojiPeople,
  FireplaceSharp,
  FmdGood,
  LibraryBooks,
  People,
  RequestQuote,
} from "@mui/icons-material";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

function openPage(page, paramName, paramValue) {
  // Use the parameters as needed, for example:
  window.location.href = page;
  //+ '?' + paramName + '=' + paramValue;
  handleClose();
}
//import { MenuItem } from "../MenuItem";
export const Navbar = () => {
  //state for menu 1
  const [anchorEl, setAnchorEl] = React.useState(null);
  //state for menu 2
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const [anchorEl3, setAnchorEl3] = React.useState(null);

  //se incializa en falso porque anchor El es null
  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorEl2);
  const open3 = Boolean(anchorEl3);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const handleClick3 = (event) => {
    setAnchorEl3(event.currentTarget);
  };
  const handleClose3 = () => {
    setAnchorEl3(null);
  };

  const { login, handlerLogout } = useAuth();
  //const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: "0px",
        background: "#000", // Establece el color de fondo a negro
      }}
      className="navbar navbar-expand-lg "
    >
      {/* Logo */}
      <img
        src={logo}
        alt="Logo"
        style={{ width: "150px", marginRight: "1px" }}
      />

      <div>
        <a className="navbar-brand" href="#">
          FLOSAMED
        </a>
        <Button
          id="demo-customized-button"
          aria-controls={open ? "demo-customized-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          variant="contained"
          disableElevation
          onClick={handleClick}
          endIcon={<KeyboardArrowDownIcon />}
          style={{
            color: "#fff",
            border: "1px solid #fff",
            margin: "2",
            padding: "2",
          }}
        >
          CATALOGOS
        </Button>
        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            "aria-labelledby": "demo-customized-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose} disableRipple>
            <LibraryBooks />
            <NavLink className="nav-link" to="/brand/register">
              MARCA +
            </NavLink>
          </MenuItem>

          <Divider sx={{ my: 0.5 }} />
          <MenuItem onClick={handleClose} disableRipple>
            <FmdGood />
            <NavLink className="nav-link" to="/users">
              UBICACION
            </NavLink>
          </MenuItem>
          <MenuItem onClick={handleClose} disableRipple>
            <Apartment />
            DEPARTAMENTO
          </MenuItem>
          <MenuItem onClick={handleClose} disableRipple>
            <EmojiPeople />
            RESPONSABLE
          </MenuItem>
          <MenuItem onClick={handleClose} disableRipple>
            <People />
            <NavLink className="nav-link" to="/users">
              UBICACION
            </NavLink>          </MenuItem>
        </StyledMenu>

        <Button
          id="demo-customized-button"
          aria-controls={open2 ? "demo-customized-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open2 ? "true" : undefined}
          variant="contained"
          disableElevation
          onClick={handleClick2}
          endIcon={<KeyboardArrowDownIcon />}
          style={{
            color: "#fff",
            border: "1px solid #fff", // Añade un borde blanco
            margin: "2",
            padding: "2",
          }}
        >
          ACTIVOS
        </Button>
        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            "aria-labelledby": "demo-customized-button",
          }}
          anchorEl={anchorEl2}
          open={open2}
          onClose={handleClose2}
        >
          <MenuItem onClick={handleClose2} disableRipple>
            <RequestQuote />
            <NavLink className="nav-link" to="/AssetPage/register">
              Registro de Activos
            </NavLink>
          </MenuItem>
          <MenuItem onClick={handleClose2} disableRipple>
            <AccountTree />
            <NavLink className="nav-link" to="/AssetGroup/register">
              Grupo de Activos
            </NavLink>
          </MenuItem>
          <Divider sx={{ my: 0.5 }} />
          <MenuItem onClick={handleClose2} disableRipple>
            <Addchart />
            <NavLink className="nav-link" to="/AssetType/register">
              Tipo de Activos
            </NavLink>
          </MenuItem>
        </StyledMenu>
        <Button
          id="demo-customized-button"
          aria-controls={open3 ? "demo-customized-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open3 ? "true" : undefined}
          variant="contained"
          disableElevation
          onClick={handleClick3}
          endIcon={<KeyboardArrowDownIcon />}
          style={{
            color: "#fff",
            border: "1px solid #fff", // Añade un borde blanco
            margin: "2",
            padding: "2",
          }}
        >
          PROCESOS
        </Button>
        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            "aria-labelledby": "demo-customized-button",
          }}
          anchorEl={anchorEl3}
          open={open3}
          onClose={handleClose3}
        >
          <MenuItem onClick={handleClose3} disableRipple>
            <RequestQuote />
            <NavLink className="nav-link" to="/AssetPage/register">
              Registro de Activos
            </NavLink>
          </MenuItem>
          <MenuItem onClick={handleClose3} disableRipple>
            <RequestQuote />
            <NavLink className="nav-link" to="/AssetPage/register">
              Grupo de Activos
            </NavLink>
          </MenuItem>
          <Divider sx={{ my: 0.5 }} />
          <MenuItem onClick={handleClose3} disableRipple>
            <RequestQuote />
            <NavLink className="nav-link" to="/AssetPage/register">
              Tipo de Activos
            </NavLink>
          </MenuItem>
        </StyledMenu>
      </div>

      <div
        className="collapse navbar-collapse justify-content-end"
        id="navbarNavLogout"
      >
        <span className="nav-item nav-link text-primary mx-3">
          {login.user?.username}
        </span>
        <button onClick={handlerLogout} className="btn btn-outline-success">
          Logout
        </button>
      </div>
    </nav>
  );
};
