import { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Grid from "@mui/material/Grid";

import Dialog from "../../components/Dialog";
import TextField from "../../components/TextField";

const initialValues = {
  tipo: "",
  cliente: "",
  data: "",
  horario: "",
  organizacao: "",
  profissional: "",
  status: "",
};

function ModalEditScheduling({ open, onClose, rowData }) {
  const defaultValues = useMemo(() => {
    return { ...initialValues, ...rowData };
  }, [rowData]);

  const methods = useForm({ defaultValues });
  const { handleSubmit } = methods;

  const isNew = useMemo(() => !Object.keys(rowData).length, [rowData]);

  const title = useMemo(
    () => `${isNew ? "Novo" : "Editar"} agendamento`,
    [isNew]
  );

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(() => null)}>
        <Dialog open={open} onClose={onClose} title={title}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <TextField name="tipo" label="Tipo" margin="none" />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField name="cliente" label="Cliente" margin="none" />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField name="dataAgendamento" label="Data" margin="none" />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name="horarioAgendamento"
                label="Horário"
                margin="none"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField name="organizacao" label="Organização" margin="none" />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name="profissional"
                label="Profissional"
                margin="none"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField name="status" label="Status" margin="none" />
            </Grid>
          </Grid>
        </Dialog>
      </form>
    </FormProvider>
  );
}

export default ModalEditScheduling;
