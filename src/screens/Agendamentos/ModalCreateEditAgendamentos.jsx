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
  tipoAgendamento: "",
  pessoaAgendamento: "",
  dataAgendamento: "",
  horarioAgendamento: "",
  organizacaoAgendamento: "",
  profissionalAgendamento: "",
  statusAgendamento: "",
};

const schema = yup.object().shape({
  tipoAgendamento: yup
    .number()
    .required("Tipo é obrigatório")
    .typeError("Tipo é obrigatório"),
  pessoaAgendamento: yup
    .number()
    .required("Cliente é obrigatório")
    .typeError("Cliente é obrigatório"),
  dataAgendamento: yup
    .date()
    .required("Data é obrigatória")
    .typeError("Data inválida"),
  horarioAgendamento: yup.string().required("Horário é obrigatório"),
  organizacaoAgendamento: yup
    .number()
    .required("Organização é obrigatória")
    .typeError("Organização é obrigatória"),
  profissionalAgendamento: yup
    .number()
    .required("Profissional é obrigatório")
    .typeError("Profissional é obrigatório"),
  statusAgendamento: yup
    .number()
    .required("Status é obrigatório")
    .typeError("Status é obrigatório"),
});

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

  const methods = useForm({ defaultValues, resolver: yupResolver(schema) });
  const { handleSubmit, watch } = methods;
  const watchValues = watch();

  const { data: clientes = [], isFetching: isFetchingClientes } = useQuery({
    endpoint: "/pessoa",
    queryOptions: { enabled: true },
  });

  const { data: organizacoes = [], isFetching: isFetchingOrganizacoes } =
    useQuery({
      endpoint: "/organizacao/bot/",
      queryOptions: { enabled: true },
    });

  const {
    data: tiposAgendamento = [],
    isFetching: isFetchingTiposAgendamento,
  } = useQuery({
    endpoint: `/tipoAgendamento/bot?organizacoes=${watchValues.organizacaoAgendamento}`,
    queryOptions: { enabled: !!watchValues.organizacaoAgendamento },
  });

  const { data: profissionais = [], isFetching: isFetchingProfissionais } =
    useQuery({
      endpoint: `/usuario/bot?organizacao=${watchValues.organizacaoAgendamento}&dataAgendamento=${watchValues.dataAgendamento}&tipoAgendamento=${watchValues.tipoAgendamento}&comPreferencia=true`,
      queryOptions: {
        enabled:
          !!watchValues.organizacaoAgendamento &&
          !!watchValues.dataAgendamento &&
          !!watchValues.tipoAgendamento,
      },
    });

  const { data: horarios = [], isFetching: isFetchingHorarios } = useQuery({
    endpoint: `/agendamento/bot/listar?reagendar=${!isNew}`,
    method: "POST",
    body: {
      tipoAgendamento: { id: watchValues.tipoAgendamento },
      pessoaAgendamento: { id: watchValues.pessoaAgendamento },
      dataAgendamento: watchValues.dataAgendamento,
      profissionalAgendamento: { id: watchValues.profissionalAgendamento },
      organizacaoAgendamento: { id: watchValues.organizacaoAgendamento },
      comPreferencia: true,
    },
    queryOptions: {
      enabled:
        !!watchValues.tipoAgendamento &&
        !!watchValues.pessoaAgendamento &&
        !!watchValues.dataAgendamento &&
        !!watchValues.profissionalAgendamento &&
        !!watchValues.organizacaoAgendamento,
      select: ({ datas }) => datas,
    },
  });

  const {
    data: statusAgendamento = [],
    isFetching: isFetchingStatusAgendamento,
  } = useQuery({
    endpoint: "/statusAgendamento",
    queryOptions: { enabled: true },
  });

  const { mutate, isLoading } = useMutation({
    endpoint: isNew ? "/agendamento/bot/marcar" : "/agendamento",
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

  const title = useMemo(() => {
    return `${isNew ? "Novo" : "Editar"} agendamento`;
  }, [isNew]);

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
            {isFetchingClientes ? (
              <Skeleton height="3.5rem" style={{ transform: "scale(1)" }} />
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
            {isFetchingOrganizacoes ? (
              <Skeleton height="3.5rem" style={{ transform: "scale(1)" }} />
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
            {isFetchingTiposAgendamento ? (
              <Skeleton height="3.5rem" style={{ transform: "scale(1)" }} />
            ) : (
              <Select
                name="tipoAgendamento"
                label="Tipo"
                margin="none"
                disabled={
                  !watchValues.organizacaoAgendamento ||
                  !tiposAgendamento.length ||
                  isLoading
                }
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
            <TextField
              name="dataAgendamento"
              label="Data"
              type="date"
              disabled={isLoading}
              InputLabelProps={{ shrink: true }}
              style={{ margin: 0 }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            {isFetchingProfissionais ? (
              <Skeleton height="3.5rem" style={{ transform: "scale(1)" }} />
            ) : (
              <Select
                name="profissionalAgendamento"
                label="Profissional"
                margin="none"
                disabled={!profissionais.length || isLoading}
              >
                {profissionais.map(({ id, nomeProfissional }) => (
                  <MenuItem key={id} value={id}>
                    {nomeProfissional}
                  </MenuItem>
                ))}
              </Select>
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            {isFetchingHorarios ? (
              <Skeleton height="3.5rem" style={{ transform: "scale(1)" }} />
            ) : (
              <Select
                name="horarioAgendamento"
                label="Horário"
                margin="none"
                disabled={!horarios.length || isLoading}
              >
                {(isNew
                  ? horarios
                  : [
                      ...horarios,
                      { horarioAgendamento: rowData?.horarioAgendamento },
                    ].sort(
                      (
                        { horarioAgendamento: horarioAgendamento1 },
                        { horarioAgendamento: horarioAgendamento2 }
                      ) => (horarioAgendamento1 < horarioAgendamento2 ? -1 : 1)
                    )
                ).map(({ horarioAgendamento }) => (
                  <MenuItem key={horarioAgendamento} value={horarioAgendamento}>
                    {horarioAgendamento}
                  </MenuItem>
                ))}
              </Select>
            )}
          </Grid>

          <Grid item xs={12}>
            {isFetchingStatusAgendamento ? (
              <Skeleton height="3.5rem" style={{ transform: "scale(1)" }} />
            ) : (
              <Select
                name="statusAgendamento"
                label="Status"
                margin="none"
                disabled={!statusAgendamento.length || isLoading}
              >
                {statusAgendamento
                  .sort(({ status: status1 }, { status: status2 }) =>
                    status1 < status2 ? -1 : 1
                  )
                  .map(({ id, status }) => (
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
