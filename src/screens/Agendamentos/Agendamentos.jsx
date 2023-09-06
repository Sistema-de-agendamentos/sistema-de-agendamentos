/* eslint-disable no-console */
import { Fragment, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

import { useMutation, useQuery } from "hooks";
import { generateQueryString } from "utils";
import { date, phone } from "utils/addMask";

import Button from "../../components/Button";
import ConfirmationModal from "../../components/ConfirmationModal";
import FiltersContainer from "../../components/FiltersContainer";
import Icon from "../../components/Icon";
import PageTitle from "../../components/PageTitle";
import Table from "../../components/Table";
import TextField from "../../components/TextField";
// eslint-disable-next-line import/no-cycle
import ModalEditScheduling from "./ModalEditScheduling";

const endpoint = "/agendamento";

const defaultValues = {
  dataInicio: "",
  dataFim: "",
  cliente: "",
  dataAgendamento: "",
  celularCliente: "",
  status: "",
};

function Agendamentos() {
  const [openModalEditScheduling, setOpenModalEditScheduling] = useState(false);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [idAgendamento, setIdAgendamento] = useState(null);

  const methods = useForm({ defaultValues });
  const { watch } = methods;
  const watchValues = watch();

  const {
    data = [],
    refetch,
    isFetching,
  } = useQuery({ endpoint: `${endpoint}${generateQueryString(watchValues)}` });

  const onCloseConfirmationModal = useCallback(() => {
    setIdAgendamento(null);
    setOpenConfirmationModal(false);
  }, []);

  const { mutate } = useMutation({
    endpoint: `${endpoint}`,
    method: "DELETE",
    mutationOptions: { onSuccess: onCloseConfirmationModal },
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
      >
        <Grid item xs={12} sm={6}>
          <TextField
            name="dataInicio"
            label="Data inicial"
            type="date"
            InputLabelProps={{ shrink: true }}
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
            margin="none"
            size="small"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            name="cliente"
            label="Nome do cliente"
            margin="none"
            size="small"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            name="dataAgendamento"
            label="Data da consulta"
            type="date"
            margin="none"
            size="small"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            name="celularCliente"
            label="Celular"
            margin="none"
            size="small"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField name="status" label="Status" margin="none" size="small" />
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
          { accessorKey: "horarioAgendamento", header: "Horário", size: 2 },
          { accessorKey: "cliente", header: "Nome completo", size: 5 },
          { accessorKey: "status", header: "Status", size: 4 },
          {
            accessorKey: "celularCliente",
            header: "Celular",
            size: 3,
            Cell: ({ row: { original } }) => phone(original.celularCliente),
          },
          { accessorKey: "profissional", header: "Profissional", size: 5 },
          {
            accessorKey: "botoes",
            header: "",
            enableColumnActions: false,
            size: 1,
            Cell: ({ row: { original } }) => (
              <Box sx={{ display: "flex", margin: "-.375rem -1rem" }}>
                <Tooltip arrow placement="left" title="Excluir">
                  <IconButton
                    color="error"
                    onClick={() => {
                      setIdAgendamento([original.idAgendamento]);
                      setOpenConfirmationModal(true);
                    }}
                    style={{ padding: ".25rem" }}
                  >
                    <Icon name="Delete" />
                  </IconButton>
                </Tooltip>

                <Tooltip arrow placement="right" title="Editar">
                  <IconButton
                    onClick={() => {
                      setOpenModalEditScheduling(true);
                      setRowData(original);
                    }}
                    style={{ padding: ".25rem" }}
                  >
                    <Icon name="Edit" />
                  </IconButton>
                </Tooltip>
              </Box>
            ),
          },
        ]}
        data={data}
      />

      <Button
        onClick={() => {
          setOpenModalEditScheduling(true);
          setRowData({});
        }}
        size="medium"
        style={{ float: "right", margin: "1.25rem 0 0" }}
      >
        Agendar
      </Button>

      {rowData && (
        <ModalEditScheduling
          open={openModalEditScheduling}
          onClose={() => {
            setOpenModalEditScheduling(false);
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
          title="Excluir agendamento?"
          text="Deseja realmente excluir o agendamento? Essa operação não poderá ser desfeita."
        />
      )}
    </Fragment>
  );
}

export default Agendamentos;
