import { styled } from "@mui/material";
import Typography from "@mui/material/Typography";

const StyledTypography = styled(Typography)((props) => ({
  marginBottom: "0.5rem",
  fontSize: "1.5rem",
  fontWeight: "bold",
  alignSelf: "flex-start",
  color: "#333",
  ":after": !props["data-remove-line"] && {
    content: "''",
    display: "block",
    width: "70%",
    height: "0.1875rem",
    background: "#0662DA",
    borderRadius: "1rem",
  },
}));

function PageTitle({ title = null, removeLine = false }) {
  return (
    <StyledTypography variant="h1" data-remove-line={removeLine}>
      {title}
    </StyledTypography>
  );
}

export default PageTitle;
