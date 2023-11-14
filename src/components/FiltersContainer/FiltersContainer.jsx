import { FormProvider } from "react-hook-form";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { styled } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import Button from "../Button";

const StyledContainerButtons = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  gap: "0.5rem",
  marginBottom: "2.5rem",
});

function FiltersContainer({
  children,
  methods,
  submit,
  defaultValues,
  isFetching,
}) {
  const { clearErrors, handleSubmit, reset } = methods;

  const { breakpoints } = useTheme();
  const smBreakpoint = useMediaQuery(breakpoints.down("md"));

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(submit)}>
        <Grid container columnSpacing={1} mt="2.5rem">
          {children}
        </Grid>

        <StyledContainerButtons {...(smBreakpoint && { mt: "1rem" })}>
          <Button
            onClick={() => reset(defaultValues)}
            size="medium"
            color="secondary"
            disabled={isFetching}
            style={{ margin: 0 }}
          >
            Limpar
          </Button>

          <Button
            type="submit"
            onClick={clearErrors}
            size="medium"
            isLoading={isFetching}
            style={{ margin: 0, minWidth: "5.75rem" }}
          >
            Buscar
          </Button>
        </StyledContainerButtons>
      </form>
    </FormProvider>
  );
}

export default FiltersContainer;
