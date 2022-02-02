import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#233540",
    },
    secondary: {
      main: "#51637099",
      blue: "#51909C",
    },
  },
  typography: {
    primary: {
      fontFamily: "Spartan, sans-serif",
    },
    secondary: {
      fontFamily: "Urbanist, sans-serif",
    },
  },
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 640,
      laptop: 1024,
      desktop: 1200,
    },
  },
});

export default theme;