import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material";

import PublicScreen from "../../components/PublicScreen";

const StyledBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  marginTop: "1.5rem",
});

function LoadingPage({ text = null }) {
  return (
    <PublicScreen title="Reautenticando...">
      {text && (
        <Typography paragraph style={{ margin: "1.3125rem 0 1.125rem" }}>
          {text}
        </Typography>
      )}

      <StyledBox>
        <CircularProgress size={50} />
      </StyledBox>
    </PublicScreen>
  );
}

export default LoadingPage;
