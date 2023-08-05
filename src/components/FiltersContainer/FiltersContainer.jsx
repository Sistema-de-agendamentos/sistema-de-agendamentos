import { FormProvider } from "react-hook-form";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { styled } from "@mui/material";

import Button from "../Button";

const StyledContainerButtons = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  gap: "0.5rem",
  marginBottom: "2.5rem",
});

function FiltersContainer({ children, methods, submit }) {
  const { clearErrors, handleSubmit, reset } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(submit)}>
        <Grid container columnSpacing={1} mt="2.5rem">
          {children}
        </Grid>

        <StyledContainerButtons>
          <Button
            onClick={reset}
            size="medium"
            color="secondary"
            style={{ margin: 0 }}
          >
            Limpar
          </Button>

          <Button
            type="submit"
            onClick={clearErrors}
            size="medium"
            style={{ margin: 0 }}
          >
            Buscar
          </Button>
        </StyledContainerButtons>
      </form>
    </FormProvider>
  );
}

export default FiltersContainer;
