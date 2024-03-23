import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import { Paid } from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";

const chartSetting = {
  yAxis: [
    {
      label: "Valor en miles x Suc.",
    },
  ],
  width: 700,
  height: 400,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translate(-15px, 0)",
    },
  },
};

const chartSetting2 = {
    yAxis: [
      {
        label: "Valor x Suc.",
      },
    ],
    width: 700,
    height: 400,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: "translate(-15px, 0)",
      },
    },
  };
const dataset = [
  {
    Flosamed: 350000,
    Proden: 320000,
    Lapaz: 150000,
    Satelite: 200000,
    HGeneral: 220000,
    month: "Jan",
  },
  {
    Flosamed: 490000,
    Proden: 212000,
    Lapaz: 117000,
    Satelite: 167000,
    HGeneral: 276000,
    month: "Fev",
  },
  {
    Flosamed: 800000,
    Proden: 250000,
    Lapaz: 150500,
    Satelite: 200100,
    HGeneral: 219000,
    month: "Mar",
  },
  {
    Flosamed: 100000,
    Proden: 250000,
    Lapaz: 150000,
    Satelite: 200000,
    HGeneral: 21000,
    month: "Apr",
  },
  {
    Flosamed: 1000000,
    Proden: 250000,
    Lapaz: 150000,
    Satelite: 200000,
    HGeneral: 215000,
    month: "May",
  },
  {
    Flosamed: 770000,
    Proden: 238000,
    Lapaz: 190000,
    Satelite: 178000,
    HGeneral: 125000,
    month: "June",
  },
  {
    Flosamed: 1000000,
    Proden: 250000,
    Lapaz: 150000,
    Satelite: 200000,
    HGeneral: 21000,
    month: "July",
  },
  {
    Flosamed: 490000,
    Proden: 250000,
    Lapaz: 150000,
    Satelite: 200000,
    HGeneral: 21000,
    month: "Aug",
  },
  {
    Flosamed: 500000,
    Proden: 250000,
    Lapaz: 150000,
    Satelite: 200000,
    HGeneral: 123000,
    month: "Sept",
  },
  {
    Flosamed: 650000,
    Proden: 243000,
    Lapaz: 145000,
    Satelite: 190000,
    HGeneral: 289000,
    month: "Oct",
  },
  {
    Flosamed: 900000,
    Proden: 250000,
    Lapaz: 178000,
    Satelite: 230000,
    HGeneral: 210000,
    month: "Nov",
  },
  {
    Flosamed: 800000,
    Proden: 450000,
    Lapaz: 341500,
    Satelite: 298000,
    HGeneral: 220000,
    month: "Dec",
  },
];

const dataset2 = [
    {
      Flosamed: 350,
      Proden: 320,
      Lapaz: 100,
      Satelite: 287,
      HGeneral: 267,
      month: "Jan",
    },
    {
      Flosamed: 340,
      Proden: 230,
      Lapaz: 330,
      Satelite: 167,
      HGeneral: 276,
      month: "Feb",
    },
    {
      Flosamed: 450,
      Proden: 399,
      Lapaz: 230,
      Satelite: 339,
      HGeneral: 229,
      month: "Mar",
    },
    {
      Flosamed: 356,
      Proden: 250,
      Lapaz: 554,
      Satelite: 390,
      HGeneral: 450,
      month: "Apr",
    },
    {
      Flosamed: 299,
      Proden: 234,
      Lapaz: 490,
      Satelite: 389,
      HGeneral: 440,
      month: "May",
    },
    {
      Flosamed: 399,
      Proden: 245,
      Lapaz: 499,
      Satelite: 330,
      HGeneral: 449,
      month: "June",
    },
    {
      Flosamed: 367,
      Proden: 244,
      Lapaz: 400,
      Satelite: 329,
      HGeneral: 440,
      month: "July",
    },
    {
      Flosamed: 345,
      Proden: 250,
      Lapaz: 390,
      Satelite: 300,
      HGeneral: 490,
      month: "Aug",
    },
    {
      Flosamed: 390,
      Proden: 250,
      Lapaz: 389,
      Satelite: 301,
      HGeneral: 430,
      month: "Sept",
    },
    {
      Flosamed: 388,
      Proden: 223,
      Lapaz: 333,
      Satelite: 302,
      HGeneral: 439,
      month: "Oct",
    },
    {
      Flosamed: 490,
      Proden: 255,
      Lapaz: 339,
      Satelite: 305,
      HGeneral: 490,
      month: "Nov",
    },
    {
      Flosamed: 590,
      Proden: 290,
      Lapaz: 399,
      Satelite: 202,
      HGeneral: 510,
      month: "Dec",
    },
  ];

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}

      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const defaultTheme = createTheme();

//const valueFormatter3 = (value) => ` $${value.toFixed(2)}`;
const valueFormatter2 = (value) => `$ ${value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`; 
// `${value}`;
const valueFormatter = (value) => `$ ${value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;



export const DashAsset = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="auto" style={{ height: "auto" }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <Paid />
          </Avatar>
          <Typography component="h1" variant="h5">
            Valor de activos ($)
          </Typography>
          <Box>
            <BarChart
              dataset={dataset}
              xAxis={[{ scaleType: "band", dataKey: "month" }]}
              series={[
                { dataKey: "Flosamed", label: "Flosamed", valueFormatter },
                { dataKey: "Proden", label: "Proden Tampico", valueFormatter },
                { dataKey: "Lapaz", label: "Suc. La Paz", valueFormatter },
                { dataKey: "Satelite", label: "Suc. Satelite", valueFormatter },
                {
                  dataKey: "HGeneral",
                  label: "Suc. H. General",
                  valueFormatter,
                },
              ]}
              {...chartSetting}
            />
          </Box>

          <Typography component="h1" variant="h5">
            Activos x Sucursal
          </Typography>
          <Box>
            <BarChart
              dataset={dataset2}
              xAxis={[{ scaleType: "band", dataKey: "month" }]}
              series={[
                { dataKey: "Flosamed", label: "Flosamed", valueFormatter2 },
                { dataKey: "Proden", label: "Proden Tampico", valueFormatter2 },
                { dataKey: "Lapaz", label: "Suc. La Paz", valueFormatter2 },
                { dataKey: "Satelite", label: "Suc. Satelite", valueFormatter2 },
                {
                  dataKey: "HGeneral",
                  label: "Suc. H. General",
                  valueFormatter2,
                },
              ]}
              {...chartSetting2}
            />
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
    
  );
};
