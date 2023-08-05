import { createTheme } from "@mui/material/styles";

const colors = {
  primary: "#0662DA",
  secondary: "#DDD",
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
          padding: ".5rem 1rem .4375rem 1rem !important",
          fontWeight: "bold",
          "&.MuiButton-inherit": {
            padding: ".5rem 1.375rem",
            textDecoration: "underline",
            textTransform: "none",
            color: "#333",
            fontSize: "0.9375rem",
          },
        },
        containedSecondary: {
          boxShadow: "0 1px 3px rgba(0, 0, 0, .3)",
          "&:hover": {
            backgroundColor: "#CCC",
            boxShadow: "0 2px 3px rgba(0, 0, 0, .3)",
          },
        },
      },
    },
  },
});

export default theme;
