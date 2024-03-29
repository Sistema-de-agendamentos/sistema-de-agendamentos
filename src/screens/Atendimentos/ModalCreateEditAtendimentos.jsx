import { useCallback, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Skeleton from "@mui/material/Skeleton";

import { useMutation, useQuery } from "hooks";
import { date } from "utils/addMask";

import Dialog from "../../components/Dialog";
import Select from "../../components/Select";
import TextField from "../../components/TextField";

const initialValues = {
  pessoa: "",
  data: "",
  horario: "",
  atividade: "",
  avaliacao: "",
  evolucaoSintomas: "",
};

const schema = yup.object().shape({
  pessoa: yup
    .number()
    .required("Cliente é obrigatório")
    .typeError("Cliente é obrigatório"),
  agendamento: yup
    .number()
    .required("Agendamento é obrigatório")
    .typeError("Agendamento é obrigatório"),
  data: yup.date().required("Data é obrigatória").typeError("Data inválida"),
  horario: yup.string().required("Horário é obrigatório"),
  atividade: yup.string().required("Atividade é obrigatório"),
  avaliacao: yup.string().required("Avaliação é obrigatório"),
  evolucaoSintomas: yup
    .string()
    .required("Evolução dos sintomas é obrigatório"),
});

function ModalCreateEditAtendimentos({ open, onClose, rowData }) {
  const isNew = useMemo(() => !Object.keys(rowData).length, [rowData]);

  const defaultValues = useMemo(() => {
    const [data, horario] = (rowData?.dataAtendimento || "").split("T");
    return {
      ...initialValues,
      pessoa: rowData?.pessoa?.id || "",
      agendamento: rowData?.agendamento?.id || "",
      data: data || "",
      horario: (horario || "").slice(0, 5),
      avaliacao: rowData?.avaliacao || "",
      atividade: rowData?.atividade || "",
      evolucaoSintomas: rowData?.evolucaoSintomas || "",
    };
  }, [rowData]);

  const methods = useForm({ defaultValues, resolver: yupResolver(schema) });
  const { handleSubmit, watch } = methods;
  const watchValues = watch();

  const { data: clientes = [], isFetching: isFetchingClientes } = useQuery({
    endpoint: "/pessoa",
    queryOptions: { enabled: true },
  });

  const { data: agendamentos = [], isFetching: isFetchingAgendamentos } =
    useQuery({
      endpoint: `/agendamento?idStatus=1&id=${
        clientes.find(({ id }) => id === watchValues.pessoa)?.nome
      }`,
      queryOptions: { enabled: !!watchValues.pessoa },
    });

  const { mutate, isLoading } = useMutation({
    endpoint: `/atendimento?agendamentoId=${watchValues.agendamento}`,
    method: isNew ? "POST" : "PUT",
    successText: "Atendimento salvo com sucesso",
    mutationOptions: { onSuccess: () => onClose(true) },
  });

  const submit = useCallback(
    ({ data, horario, pessoa, agendamento, ...rest }) => {
      const dataFinal = data.toISOString().slice(0, 10);
      const horarioFinal = horario.length === 5 ? `${horario}:00` : horario;

      mutate({
        ...{ id: rowData?.id },
        dataAtendimento: `${dataFinal}T${horarioFinal}`,
        pessoa: { id: pessoa },
        ...rest,
      });
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
        <Grid container rowSpacing={2} columnSpacing={1} p="1rem 0">
          <Grid item xs={12}>
            {isFetchingClientes ? (
              <Skeleton height="3.5rem" style={{ transform: "scale(1)" }} />
            ) : (
              <Select
                name="pessoa"
                label="Cliente"
                margin="none"
                disabled={!clientes.length || isLoading}
              >
                {clientes
                  .sort(({ nome: nome1 }, { nome: nome2 }) =>
                    nome1 > nome2 ? 1 : -1
                  )
                  .map(({ id, nome }) => (
                    <MenuItem key={id} value={id}>
                      {nome}
                    </MenuItem>
                  ))}
              </Select>
            )}
          </Grid>

          <Grid item xs={12}>
            {isFetchingAgendamentos ? (
              <Skeleton height="3.5rem" style={{ transform: "scale(1)" }} />
            ) : (
              <Select
                name="agendamento"
                label="Agendamento"
                margin="none"
                disabled={!agendamentos.length || isLoading}
              >
                {(isNew
                  ? agendamentos
                  : [
                      ...agendamentos,
                      {
                        id: rowData?.agendamento?.id,
                        dataAgendamento: rowData?.agendamento?.dataAgendamento,
                        horarioAgendamento:
                          rowData?.agendamento?.horarioAgendamento,
                      },
                    ]
                )
                  .sort(
                    (
                      {
                        dataAgendamento: dataAgendamento1,
                        horarioAgendamento: horarioAgendamento1,
                      },
                      {
                        dataAgendamento: dataAgendamento2,
                        horarioAgendamento: horarioAgendamento2,
                      }
                    ) =>
                      `${dataAgendamento1}${horarioAgendamento1}` >
                      `${dataAgendamento2}${horarioAgendamento2}`
                        ? -1
                        : 1
                  )
                  .map(({ id, dataAgendamento, horarioAgendamento }) => (
                    <MenuItem key={id} value={id}>
                      {`${date(dataAgendamento)} ${horarioAgendamento.slice(
                        0,
                        5
                      )}`}
                    </MenuItem>
                  ))}
              </Select>
            )}
          </Grid>

          <Grid item xs={12} sm={7}>
            <TextField
              name="data"
              label="Data"
              type="date"
              disabled={isLoading}
              InputLabelProps={{ shrink: true }}
              style={{ margin: 0 }}
            />
          </Grid>

          <Grid item xs={12} sm={5}>
            <TextField
              name="horario"
              label="Horário"
              type="time"
              disabled={isLoading}
              InputLabelProps={{ shrink: true }}
              style={{ margin: 0 }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="atividade"
              label="Atividade"
              multiline
              disabled={isLoading}
              style={{ margin: 0 }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="avaliacao"
              label="Avaliação"
              multiline
              disabled={isLoading}
              style={{ margin: 0 }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="evolucaoSintomas"
              label="Evolução dos sintomas"
              multiline
              disabled={isLoading}
              style={{ margin: 0 }}
            />
          </Grid>
        </Grid>
      </Dialog>
    </FormProvider>
  );
}

export default ModalCreateEditAtendimentos;
