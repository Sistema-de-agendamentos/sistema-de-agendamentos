import { styled } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogMUI from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

import Button from "../Button";
import PageTitle from "../PageTitle";

const StyledDialogActions = styled(DialogActions)({
  gap: ".5rem",
  margin: "0 1rem 1rem 1rem",
});

const StyledDialogContent = styled(DialogContent)({
  marginTop: "1rem",
});

function CustomSlide(props) {
  return <Slide direction="up" {...props} />;
}

function Dialog({
  open,
  onClose,
  title,
  fullWidth = true,
  maxWidth = "sm",
  children,
}) {
  return (
    <DialogMUI
      open={open}
      onClose={onClose}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      TransitionComponent={CustomSlide}
    >
      <DialogTitle>
        <PageTitle title={title} isModal />
      </DialogTitle>

      <StyledDialogContent>{children}</StyledDialogContent>

      <StyledDialogActions>
        <Button
          type="submit"
          onClick={onClose}
          size="small"
          style={{ margin: 0 }}
        >
          Salvar
        </Button>

        <Button
          onClick={onClose}
          size="small"
          color="secondary"
          style={{ margin: 0 }}
        >
          Cancelar
        </Button>
      </StyledDialogActions>
    </DialogMUI>
  );
}

export default Dialog;
