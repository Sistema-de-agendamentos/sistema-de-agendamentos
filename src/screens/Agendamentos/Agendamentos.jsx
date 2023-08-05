import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { Grid } from "@mui/material";

import TextField from "../../components/TextField";
import PageTitle from "../../components/PageTitle";
import FiltersContainer from "../../components/FiltersContainer";

const defaultValues = {
  nome: "",
  data: "",
  celular: "",
  status: "",
};

function Agendamentos() {
  const methods = useForm({ defaultValues });

  return (
    <Fragment>
      <PageTitle title="Agendamentos" />

      <FiltersContainer methods={methods}>
        <Grid item xs={12} sm={6}>
          <TextField
            name="nome"
            label="Nome do cliente"
            margin="none"
            size="small"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            name="data"
            label="Data da consulta"
            margin="none"
            size="small"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            name="celular"
            label="Celular"
            margin="none"
            size="small"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField name="status" label="Status" margin="none" size="small" />
        </Grid>
      </FiltersContainer>
    </Fragment>
  );
}

export default Agendamentos;
