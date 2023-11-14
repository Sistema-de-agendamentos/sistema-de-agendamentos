import { useCallback, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Skeleton from "@mui/material/Skeleton";

import { useMutation, useQuery } from "hooks";

import Dialog from "../../components/Dialog";
import Select from "../../components/Select";
import TextField from "../../components/TextField";

const initialValues = {
  nome: "",
  dataNascimento: "",
  genero: null,
  cpf: "",
  email: "",
  celular: "",
  telefone: "",
};

const schema = yup.object().shape({
  nome: yup.string().required("Nome é obrigatório"),
  dataNascimento: yup
    .date()
    .required("Data de nascimento é obrigatória")
    .typeError("Data de nascimento inválida"),
  genero: yup.number().required("Gênero é obrigatório"),
  cpf: yup.string().required("CPF é obrigatório"),
  celular: yup.string().required("Celular é obrigatório"),
});

function ModalCreateEditClientes({ open, onClose, rowData }) {
  const isNew = useMemo(() => !Object.keys(rowData).length, [rowData]);

  const defaultValues = useMemo(() => {
    return {
      ...initialValues,
      nome: rowData?.nome || "",
      dataNascimento: rowData?.dataNascimento || "",
      genero: rowData?.genero?.id || null,
      cpf: rowData?.cpf || "",
      email: rowData?.email || "",
      celular: rowData?.celular || "",
      telefone: rowData?.telefone || "",
    };
  }, [rowData]);

  const methods = useForm({ defaultValues, resolver: yupResolver(schema) });
  const { handleSubmit } = methods;

  const { data: generos = [], isFetching: isFetchingGeneros } = useQuery({
    endpoint: "/genero",
    queryOptions: { enabled: true },
  });

  const { mutate, isLoading } = useMutation({
    endpoint: "/pessoa",
    method: isNew ? "POST" : "PUT",
    successText: "Cliente salvo com sucesso",
    mutationOptions: { onSuccess: () => onClose(true) },
  });

  const submit = useCallback(
    ({ genero, ...rest }) =>
      mutate({ ...{ id: rowData?.id }, ...rest, genero: { id: genero } }),
    [mutate, rowData?.id]
  );

  const title = useMemo(() => `${isNew ? "Novo" : "Editar"} cliente`, [isNew]);

  return (
    <FormProvider {...methods}>
      <Dialog
        open={open}
        onConfirm={handleSubmit(submit)}
        onClose={() => onClose()}
        title={title}
        isLoading={isLoading}
      >
        <Grid container rowSpacing={2} columnSpacing={1} p="1rem 0">
          <Grid item xs={12} sm={6}>
            <TextField
              name="nome"
              label="Nome"
              disabled={isLoading}
              style={{ margin: 0 }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="dataNascimento"
              label="Data de nascimento"
              type="date"
              disabled={isLoading}
              InputLabelProps={{ shrink: true }}
              style={{ margin: 0 }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            {isFetchingGeneros ? (
              <Skeleton height="3.5rem" style={{ transform: "scale(1)" }} />
            ) : (
              <Select
                name="genero"
                label="Gênero"
                disabled={!generos.length || isLoading}
                margin="none"
              >
                {generos.map(({ id, genero }) => (
                  <MenuItem key={id} value={id}>
                    {genero}
                  </MenuItem>
                ))}
              </Select>
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="cpf"
              label="CPF"
              mask="cpf"
              disabled={isLoading}
              style={{ margin: 0 }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="email"
              label="E-mail"
              disabled={isLoading}
              style={{ margin: 0 }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="celular"
              label="Celular"
              mask="cell"
              disabled={isLoading}
              style={{ margin: 0 }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="telefone"
              label="Telefone"
              mask="phone"
              disabled={isLoading}
              style={{ margin: 0 }}
            />
          </Grid>
        </Grid>
      </Dialog>
    </FormProvider>
  );
}

export default ModalCreateEditClientes;
