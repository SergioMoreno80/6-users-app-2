// src/components/MenuItem.jsx
import React from 'react';
import Menu from "@mui/material/Menu";

export const MenuItem = ({ to, label }) => {
  
  return (
    <li>
      <a href={to} className="menu-item">{label}</a>
    </li>
  );
};

