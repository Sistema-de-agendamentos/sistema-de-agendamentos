/* eslint-disable no-console */
import { Fragment, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import { useMutation, useQuery } from "hooks";
import { generateQueryString } from "utils";
import { phone } from "utils/addMask";

import Button from "../../components/Button";
import ConfirmationModal from "../../components/ConfirmationModal";
import FiltersContainer from "../../components/FiltersContainer";
import Icon from "../../components/Icon";
import PageTitle from "../../components/PageTitle";
import Table from "../../components/Table";
import TextField from "../../components/TextField";
// eslint-disable-next-line import/no-cycle
import ModalCreateEditClientes from "./ModalCreateEditClientes";

const endpoint = "/pessoa";

const defaultValues = {
  nome: "",
  estado: "",
  cidade: "",
  celular: "",
  responsavel: "",
};

function Clientes() {
  const [openModalCreateEditClientes, setOpenModalCreateEditClientes] =
    useState(false);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [idCliente, setIdCliente] = useState(null);

  const methods = useForm({ defaultValues });
  const { watch } = methods;
  const watchValues = watch();

  const {
    data = [],
    refetch,
    isFetching,
  } = useQuery({ endpoint: `${endpoint}${generateQueryString(watchValues)}` });

  const onCloseConfirmationModal = useCallback(
    (getData) => {
      if (getData) refetch();
      setIdCliente(null);
      setOpenConfirmationModal(false);
    },
    [refetch]
  );

  const { mutate, isLoading: isLoadingDeleting } = useMutation({
    endpoint,
    method: "DELETE",
    body: [idCliente],
    mutationOptions: { onSuccess: () => onCloseConfirmationModal(true) },
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <Fragment>
      <PageTitle title="Clientes" />

      <FiltersContainer
        methods={methods}
        submit={refetch}
        defaultValues={defaultValues}
      >
        <Grid item xs={12} sm={5}>
          <TextField
            name="nome"
            label="Nome"
            disabled={isFetching}
            margin="none"
            size="small"
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            name="estado"
            label="Estado"
            disabled={isFetching}
            margin="none"
            size="small"
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            name="cidade"
            label="Cidade"
            disabled={isFetching}
            margin="none"
            size="small"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            name="celular"
            label="Celular"
            disabled={isFetching}
            margin="none"
            size="small"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            name="responsavel"
            label="Responsável"
            disabled={isFetching}
            margin="none"
            size="small"
          />
        </Grid>
      </FiltersContainer>

      <Table
        state={{ isLoading: isFetching }}
        columns={[
          { accessorKey: "nome", header: "Nome completo", size: 5 },
          { accessorKey: "cidade", header: "Cidade / UF", size: 3 },
          {
            accessorKey: "celular",
            header: "Celular",
            size: 4,
            Cell: ({ row: { original } }) => phone(original.celular),
          },
          { accessorKey: "responsavel", header: "Responsável", size: 5 },
          { accessorKey: "motivo", header: "Motivo", size: 7 },
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
                      setIdCliente([original.id]);
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
                      setOpenModalCreateEditClientes(true);
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
        renderDetailPanel={({ row: { original } }) => {
          if (!original.queixaPrincipal && !original.medicamentos)
            return (
              <Typography variant="body2">
                Não há dados para serem exibidos
              </Typography>
            );

          return (
            <Box display="flex" flexDirection="column" gap="1rem">
              {original.queixaPrincipal && (
                <Box>
                  <Typography variant="subtitle2" fontWeight="bold">
                    Queixa principal
                  </Typography>

                  <Typography variant="body2">
                    {original.queixaPrincipal}
                  </Typography>
                </Box>
              )}

              {original.medicamentos && (
                <Box>
                  <Typography variant="subtitle2" fontWeight="bold">
                    Medicamentos
                  </Typography>

                  <Typography variant="body2">
                    {original.medicamentos}
                  </Typography>
                </Box>
              )}
            </Box>
          );
        }}
      />

      <Button
        onClick={() => {
          setOpenModalCreateEditClientes(true);
          setRowData({});
        }}
        size="medium"
        style={{ float: "right", margin: "1.25rem 0 .5rem" }}
      >
        Criar
      </Button>

      {rowData && (
        <ModalCreateEditClientes
          open={openModalCreateEditClientes}
          onClose={(getData) => {
            if (getData) refetch();
            setOpenModalCreateEditClientes(false);
            setTimeout(() => setRowData(null), 300);
          }}
          rowData={rowData}
        />
      )}

      {openConfirmationModal && (
        <ConfirmationModal
          open={openConfirmationModal}
          onClose={onCloseConfirmationModal}
          onConfirm={() => mutate(idCliente)}
          isLoading={isLoadingDeleting}
          title="Excluir cliente?"
          text="Deseja realmente excluir o cliente? Essa operação não poderá ser desfeita."
        />
      )}
    </Fragment>
  );
}

export default Clientes;
