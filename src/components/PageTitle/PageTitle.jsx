import { styled } from "@mui/material";
import Typography from "@mui/material/Typography";

const StyledTypography = styled(Typography)((props) => ({
  width: "fit-content",
  marginBottom: "0.5rem",
  fontSize: props["data-is-modal"] ? "1.375rem" : "1.75rem",
  fontWeight: "bold",
  alignSelf: "flex-start",
  color: "#333",
  ":after": !props["data-remove-line"] && {
    content: "''",
    display: "block",
    width: "60%",
    height: "0.1875rem",
    background: "#0662DA",
    borderRadius: "1rem",
  },
  [props.theme.breakpoints.down("sm")]: {
    fontSize: props["data-is-modal"] ? "1.25rem" : "1.375rem",
  },
}));

function PageTitle({ title = null, removeLine = false, isModal = false }) {
  return (
    <StyledTypography
      variant="h1"
      data-remove-line={removeLine}
      data-is-modal={isModal}
    >
      {title}
    </StyledTypography>
  );
}

export default PageTitle;
