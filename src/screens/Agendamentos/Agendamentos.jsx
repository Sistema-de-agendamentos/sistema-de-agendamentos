/* eslint-disable no-console */
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Skeleton from "@mui/material/Skeleton";

import { useMutation, useQuery } from "hooks";
import { generateQueryString } from "utils";
import { date, phone } from "utils/addMask";

import Button from "../../components/Button";
import Select from "../../components/Select";
import ConfirmationModal from "../../components/ConfirmationModal";
import FiltersContainer from "../../components/FiltersContainer";
import Icon from "../../components/Icon";
import PageTitle from "../../components/PageTitle";
import Table from "../../components/Table";
import TextField from "../../components/TextField";
// eslint-disable-next-line import/no-cycle
import ModalCreateEditAgendamentos from "./ModalCreateEditAgendamentos";

const endpoint = "/agendamento";

const defaultValues = {
  dataInicio: "",
  dataFim: "",
  nomePessoa: "",
  dataAgendamento: "",
  // celularPessoa: "",
  idStatus: 1,
};

function Agendamentos() {
  const [openModalCreateEditAgendamentos, setOpenModalCreateEditAgendamentos] =
    useState(false);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [idAgendamento, setIdAgendamento] = useState(null);

  const {
    data: statusAgendamento = [],
    isFetching: isFetchingStatusAgendamento,
  } = useQuery({
    endpoint: "/statusAgendamento",
    queryOptions: { enabled: true },
  });

  const methods = useForm({ defaultValues });
  const { watch } = methods;
  const watchValues = watch();

  const queryString = useMemo(() => {
    return generateQueryString({
      ...watchValues,
      nomePessoa: watchValues.nomePessoa.replace(/[^A-z|^ ]/g, "").trim(),
      // celularPessoa: watchValues.celularPessoa.replace(/\D/g, ""),
    });
  }, [watchValues]);

  const {
    data = [],
    refetch,
    isFetching,
  } = useQuery({ endpoint: `${endpoint}${queryString}` });

  const orderedData = useMemo(() => {
    return data.sort(
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
    );
  }, [data]);

  const onCloseConfirmationModal = useCallback(
    (getData) => {
      if (getData) refetch();
      setIdAgendamento(null);
      setOpenConfirmationModal(false);
    },
    [refetch]
  );

  const { mutate, isLoading: isLoadingDeleting } = useMutation({
    endpoint: `${endpoint}`,
    body: [idAgendamento],
    method: "DELETE",
    mutationOptions: { onSuccess: () => onCloseConfirmationModal(true) },
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <Fragment>
      <PageTitle title="Agendamentos" />

      <FiltersContainer
        methods={methods}
        submit={refetch}
        defaultValues={defaultValues}
        isFetching={isFetching}
      >
        <Grid item xs={12} sm={6}>
          <TextField
            name="dataInicio"
            label="Data inicial"
            type="date"
            InputLabelProps={{ shrink: true }}
            disabled={isFetching}
            margin="none"
            size="small"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            name="dataFim"
            label="Data final"
            type="date"
            InputLabelProps={{ shrink: true }}
            disabled={isFetching}
            margin="none"
            size="small"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            name="nomePessoa"
            label="Nome do cliente"
            disabled={isFetching}
            margin="none"
            size="small"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            name="dataAgendamento"
            label="Data da consulta"
            type="date"
            InputLabelProps={{ shrink: true }}
            disabled={isFetching}
            margin="none"
            size="small"
          />
        </Grid>

        {/* <Grid item xs={12} sm={6}>
          <TextField
            name="celularPessoa"
            label="Celular"
            disabled={isFetching}
            margin="none"
            size="small"
          />
        </Grid> */}

        <Grid item xs={12} sm={6}>
          {isFetchingStatusAgendamento ? (
            <Skeleton
              height="2.5rem"
              style={{ transform: "scale(1)", margin: "0 0 .9375rem" }}
            />
          ) : (
            <Select
              name="idStatus"
              label="Status"
              disabled={!statusAgendamento.length || isFetching}
              margin="none"
              size="small"
            >
              {statusAgendamento.map(({ id, status }) => (
                <MenuItem key={id} value={id}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          )}
        </Grid>
      </FiltersContainer>

      <Table
        state={{ isLoading: isFetching }}
        columns={[
          {
            accessorKey: "dataAgendamento",
            header: "Data",
            size: 2,
            Cell: ({ row: { original } }) => date(original.dataAgendamento),
          },
          {
            accessorKey: "horarioAgendamento",
            header: "Horário",
            size: 2,
            Cell: ({ row: { original } }) =>
              original.horarioAgendamento.slice(0, 5),
          },
          {
            accessorKey: "pessoaAgendamento.nome",
            header: "Nome completo",
            size: 5,
          },
          {
            accessorKey: "statusAgendamento.status",
            header: "Status",
            size: 4,
          },
          {
            accessorKey: "pessoaAgendamento.celular",
            header: "Celular",
            size: 3,
            Cell: ({ row: { original } }) =>
              phone(original.pessoaAgendamento?.celular),
          },
          {
            accessorKey: "profissionalAgendamento.nomeProfissional",
            header: "Profissional",
            size: 5,
          },
          {
            accessorKey: "botoes",
            header: "",
            enableColumnActions: false,
            size: 1,
            Cell: ({ row: { original } }) => {
              const actualDate = new Date()
                .toLocaleString("pt-BR")
                .replace(/(\d{2})\/(\d{2})\/(\d{4})(.+)/, "$3-$2-$1");
              const isFuture = original.dataAgendamento >= actualDate;

              return (
                <Box sx={{ display: "flex", margin: "-.375rem -1rem" }}>
                  <Tooltip arrow placement="left" title="Excluir">
                    <IconButton
                      color="error"
                      onClick={() => {
                        setIdAgendamento([original.id]);
                        setOpenConfirmationModal(true);
                      }}
                      style={{ padding: ".25rem" }}
                    >
                      <Icon name="Delete" />
                    </IconButton>
                  </Tooltip>

                  {isFuture && (
                    <Tooltip arrow placement="right" title="Editar">
                      <IconButton
                        onClick={() => {
                          setOpenModalCreateEditAgendamentos(true);
                          setRowData(original);
                        }}
                        style={{ padding: ".25rem" }}
                      >
                        <Icon name="Edit" />
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>
              );
            },
          },
        ]}
        data={orderedData}
      />

      <Button
        onClick={() => {
          setOpenModalCreateEditAgendamentos(true);
          setRowData({});
        }}
        size="medium"
        style={{ float: "right", margin: "1.25rem 0 .5rem" }}
      >
        Agendar
      </Button>

      {rowData && (
        <ModalCreateEditAgendamentos
          open={openModalCreateEditAgendamentos}
          onClose={(getData) => {
            if (getData) refetch();
            setOpenModalCreateEditAgendamentos(false);
            setTimeout(() => setRowData(null), 300);
          }}
          rowData={rowData}
        />
      )}

      {openConfirmationModal && (
        <ConfirmationModal
          open={openConfirmationModal}
          onClose={onCloseConfirmationModal}
          onConfirm={() => mutate(idAgendamento)}
          isLoading={isLoadingDeleting}
          title="Excluir agendamento?"
          text="Deseja realmente excluir o agendamento? Essa operação não poderá ser desfeita."
        />
      )}
    </Fragment>
  );
}

export default Agendamentos;
