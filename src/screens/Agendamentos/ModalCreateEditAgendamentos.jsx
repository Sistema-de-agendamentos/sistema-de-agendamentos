import { useCallback, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Skeleton from "@mui/material/Skeleton";

import { useMutation, useQuery } from "hooks";

import Dialog from "../../components/Dialog";
import Select from "../../components/Select";
import TextField from "../../components/TextField";

const initialValues = {
  tipoAgendamento: "",
  pessoaAgendamento: "",
  dataAgendamento: "",
  horarioAgendamento: "",
  organizacaoAgendamento: "",
  profissionalAgendamento: "",
  statusAgendamento: "",
};

function ModalCreateEditAgendamentos({ open, onClose, rowData }) {
  const isNew = useMemo(() => !Object.keys(rowData).length, [rowData]);

  const defaultValues = useMemo(() => {
    return {
      ...initialValues,
      tipoAgendamento: rowData?.tipoAgendamento?.id || "",
      pessoaAgendamento: rowData?.pessoaAgendamento?.id || "",
      dataAgendamento: rowData?.dataAgendamento || "",
      horarioAgendamento: rowData?.horarioAgendamento || "",
      organizacaoAgendamento: rowData?.organizacaoAgendamento?.id || "",
      profissionalAgendamento: rowData?.profissionalAgendamento?.id || "",
      statusAgendamento: rowData?.statusAgendamento?.id || "",
    };
  }, [rowData]);

  const methods = useForm({ defaultValues });
  const { handleSubmit } = methods;

  const {
    data: tiposAgendamento = [],
    isFetching: isFetchingTiposAgendamento,
  } = useQuery({
    endpoint: "/tipoAgendamento",
    queryOptions: { enabled: true },
  });

  const { data: clientes = [], isFetching: isFetchingClientes } = useQuery({
    endpoint: "/pessoa",
    queryOptions: { enabled: true },
  });

  const { data: organizacoes = [], isFetching: isFetchingOrganizacoes } =
    useQuery({
      endpoint: "/organizacao",
      queryOptions: { enabled: true },
    });

  const { data: profissionais = [], isFetching: isFetchingProfissionais } =
    useQuery({
      endpoint: "/usuario",
      queryOptions: { enabled: true },
    });

  const {
    data: statusAgendamento = [],
    isFetching: isFetchingStatusAgendamento,
  } = useQuery({
    endpoint: "/statusAgendamento",
    queryOptions: { enabled: true },
  });

  const { mutate, isLoading } = useMutation({
    endpoint: "/agendamento",
    method: isNew ? "POST" : "PUT",
    successText: "Agendamento salvo com sucesso",
    mutationOptions: { onSuccess: () => onClose(true) },
  });

  const submit = useCallback(
    ({ dataAgendamento, horarioAgendamento, ...rest }) => {
      const valuesFormatted = Object.entries(rest).reduce(
        (acc, [key, value]) => ({ ...acc, [key]: { id: value } }),
        {}
      );

      mutate({
        ...{ id: rowData?.id },
        dataAgendamento,
        horarioAgendamento:
          horarioAgendamento.length === 5
            ? `${horarioAgendamento}:00`
            : horarioAgendamento,
        ...valuesFormatted,
      });
    },
    [mutate, rowData?.id]
  );

  const title = useMemo(
    () => `${isNew ? "Novo" : "Editar"} agendamento`,
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
            {isFetchingTiposAgendamento ? (
              <Skeleton
                height="3.5rem"
                style={{ transform: "scale(1)", margin: "1rem 0 .5rem" }}
              />
            ) : (
              <Select
                name="tipoAgendamento"
                label="Tipo"
                margin="none"
                disabled={!tiposAgendamento.length || isLoading}
              >
                {tiposAgendamento.map(({ id, tipoAgendamento }) => (
                  <MenuItem key={id} value={id}>
                    {tipoAgendamento}
                  </MenuItem>
                ))}
              </Select>
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            {isFetchingClientes ? (
              <Skeleton
                height="3.5rem"
                style={{ transform: "scale(1)", margin: "1rem 0 .5rem" }}
              />
            ) : (
              <Select
                name="pessoaAgendamento"
                label="Cliente"
                margin="none"
                disabled={!clientes.length || isLoading}
              >
                {clientes.map(({ id, nome }) => (
                  <MenuItem key={id} value={id}>
                    {nome}
                  </MenuItem>
                ))}
              </Select>
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="dataAgendamento"
              label="Data"
              type="date"
              disabled={isLoading}
              InputLabelProps={{ shrink: true }}
              style={{ margin: "1rem 0 .5rem" }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="horarioAgendamento"
              label="Horário"
              type="time"
              disabled={isLoading}
              InputLabelProps={{ shrink: true }}
              style={{ margin: "1rem 0 .5rem" }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            {isFetchingOrganizacoes ? (
              <Skeleton
                height="3.5rem"
                style={{ transform: "scale(1)", margin: "1rem 0 .5rem" }}
              />
            ) : (
              <Select
                name="organizacaoAgendamento"
                label="Organização"
                margin="none"
                disabled={!organizacoes.length || isLoading}
              >
                {organizacoes.map(({ id, nome }) => (
                  <MenuItem key={id} value={id}>
                    {nome}
                  </MenuItem>
                ))}
              </Select>
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            {isFetchingProfissionais ? (
              <Skeleton
                height="3.5rem"
                style={{ transform: "scale(1)", margin: "1rem 0 .5rem" }}
              />
            ) : (
              <Select
                name="profissionalAgendamento"
                label="Profissional"
                margin="none"
                disabled={!profissionais.length || isLoading}
              >
                {profissionais.map(({ id, login }) => (
                  <MenuItem key={id} value={id}>
                    {login}
                  </MenuItem>
                ))}
              </Select>
            )}
          </Grid>

          <Grid item xs={12}>
            {isFetchingStatusAgendamento ? (
              <Skeleton
                height="3.5rem"
                style={{ transform: "scale(1)", margin: "1rem 0 .5rem" }}
              />
            ) : (
              <Select
                name="statusAgendamento"
                label="Status"
                margin="none"
                disabled={!statusAgendamento.length || isLoading}
              >
                {statusAgendamento.map(({ id, status }) => (
                  <MenuItem key={id} value={id}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            )}
          </Grid>
        </Grid>
      </Dialog>
    </FormProvider>
  );
}

export default ModalCreateEditAgendamentos;
