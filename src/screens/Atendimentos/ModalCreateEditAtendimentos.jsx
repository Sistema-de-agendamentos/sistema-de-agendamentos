import { useCallback, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Grid from "@mui/material/Grid";

import { useMutation } from "hooks";

import Dialog from "../../components/Dialog";
import TextField from "../../components/TextField";

const initialValues = {
  dataAtendimento: "",
  avaliacao: "",
  atividade: "",
  evolucaoSintomas: "",
};

function ModalCreateEditAtendimentos({ open, onClose, rowData }) {
  const isNew = useMemo(() => !Object.keys(rowData).length, [rowData]);

  const defaultValues = useMemo(() => {
    return {
      ...initialValues,
      dataAtendimento: rowData?.dataAtendimento?.slice(0, 10) || "",
      avaliacao: rowData?.avaliacao || "",
      atividade: rowData?.atividade || "",
      evolucaoSintomas: rowData?.evolucaoSintomas || "",
    };
  }, [rowData]);

  const methods = useForm({ defaultValues });
  const { handleSubmit } = methods;

  const { mutate, isLoading } = useMutation({
    endpoint: "/atendimento",
    method: isNew ? "POST" : "PUT",
    successText: "Atendimento salvo com sucesso",
    mutationOptions: { onSuccess: () => onClose(true) },
  });

  const submit = useCallback(
    (values) => {
      mutate({ ...{ id: rowData?.id }, ...values });
    },
    [mutate, rowData?.id]
  );

  const title = useMemo(
    () => `${isNew ? "Novo" : "Editar"} atendimento`,
    [isNew]
  );

  return (
    <FormProvider {...methods}>
      <Dialog
        open={open}
        onConfirm={handleSubmit(submit)}
        onClose={() => onClose()}
        title={title}
        isLoading={isLoading}
      >
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="dataAtendimento"
              label="Data"
              type="date"
              disabled={isLoading}
              InputLabelProps={{ shrink: true }}
              style={{ margin: "1rem 0 .5rem" }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="avaliacao"
              label="Avaliação"
              disabled={isLoading}
              style={{ margin: "1rem 0 .5rem" }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="atividade"
              label="Atividade"
              disabled={isLoading}
              style={{ margin: "1rem 0 .5rem" }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="evolucaoSintomas"
              label="Evolução dos sintomas"
              disabled={isLoading}
              style={{ margin: "1rem 0 .5rem" }}
            />
          </Grid>
        </Grid>
      </Dialog>
    </FormProvider>
  );
}

export default ModalCreateEditAtendimentos;
