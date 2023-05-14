import { styled } from "@mui/material";
import Box from "@mui/material/Box";

const StyledContainer = styled(Box)({
  display: "flex",
  height: "100vh",
});

const StyledContentLeft = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: "45%",
});

const StyledContentRight = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  width: "55%",
  padding: "10rem",
  background: "#F5F5F5",
  boxShadow: "0 0 5px rgba(0, 0, 0, 0.05)",
  "& > form": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
});

export { StyledContainer, StyledContentLeft, StyledContentRight };
