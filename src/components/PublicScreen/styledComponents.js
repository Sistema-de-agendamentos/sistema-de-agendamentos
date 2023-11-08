import { styled } from "@mui/material";
import Box from "@mui/material/Box";

const StyledContainer = styled(Box)({
  display: "flex",
  height: "100vh",
});

const StyledContentLeft = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: "45%",
  background: "#FFF",
  [theme.breakpoints.down("md")]: {
    background: "#FFF",
    padding: "2rem",
  },
}));

const StyledContentRight = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  width: "55%",
  padding: "10rem",
  [theme.breakpoints.down("lg")]: {
    padding: "5rem",
  },
  [theme.breakpoints.down("md")]: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    background: "#FFF",
    padding: "10rem",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "2rem",
  },
  boxShadow: "0 0 5px rgba(0, 0, 0, 0.05)",
  "& > form": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
}));

export { StyledContainer, StyledContentLeft, StyledContentRight };
