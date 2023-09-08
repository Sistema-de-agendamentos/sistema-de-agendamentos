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

const StyledDialogContent = styled(DialogContent)({});

function CustomSlide(props) {
  return <Slide direction="up" {...props} />;
}

function ConfirmationModal({
  open,
  onConfirm,
  onClose,
  title,
  text,
  isLoading,
}) {
  return (
    <DialogMUI
      open={open}
      onClose={isLoading ? null : () => onClose()}
      fullWidth
      maxWidth="xs"
      TransitionComponent={CustomSlide}
    >
      <DialogTitle>
        <PageTitle title={title} isModal />
      </DialogTitle>

      <StyledDialogContent>{text}</StyledDialogContent>

      <StyledDialogActions>
        <Button
          onClick={onConfirm}
          isLoading={isLoading}
          size="small"
          color="error"
          style={{ margin: 0 }}
        >
          Sim
        </Button>

        <Button
          onClick={() => onClose()}
          disabled={isLoading}
          size="small"
          color="secondary"
          style={{ margin: 0 }}
        >
          Não
        </Button>
      </StyledDialogActions>
    </DialogMUI>
  );
}

export default ConfirmationModal;
