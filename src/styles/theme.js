import { createTheme } from "@mui/material/styles";

const colors = {
  primary: "#0662DA",
  secondary: "#E5E5E5",
};

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: "bold",
          "&.MuiButton-inherit": {
            padding: "0.5rem 1.375rem",
            textDecoration: "underline",
            textTransform: "none",
            color: "#333",
            fontSize: "0.9375rem",
          },
        },
      },
    },
  },
});

export default theme;
