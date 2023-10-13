import { Fragment, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Skeleton from "@mui/material/Skeleton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import { useMutation, useQuery } from "hooks";
import { generateQueryString } from "utils";
import { date } from "utils/addMask";

import Button from "../../components/Button";
import ConfirmationModal from "../../components/ConfirmationModal";
import FiltersContainer from "../../components/FiltersContainer";
import Icon from "../../components/Icon";
import PageTitle from "../../components/PageTitle";
import Select from "../../components/Select";
import Table from "../../components/Table";
import TextField from "../../components/TextField";
// eslint-disable-next-line import/no-cycle
import ModalCreateEditAtendimentos from "./ModalCreateEditAtendimentos";

const endpoint = "/atendimento";

const defaultValues = {
  dataInicio: "",
  dataFim: "",
  pessoaId: "",
  atividade: "",
};

function Atendimentos() {
  const [openModalCreateEditAtendimentos, setOpenModalCreateEditAtendimentos] =
    useState(false);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [idAtendimento, setIdAtendimento] = useState(null);

  const { data: clientes = [], isFetching: isFetchingClientes } = useQuery({
    endpoint: "/pessoa",
    queryOptions: { enabled: true },
  });

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
      setIdAtendimento(null);
      setOpenConfirmationModal(false);
    },
    [refetch]
  );

  const { mutate, isLoading: isLoadingDeleting } = useMutation({
    endpoint,
    method: "DELETE",
    body: [idAtendimento],
    mutationOptions: { onSuccess: () => onCloseConfirmationModal(true) },
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <Fragment>
      <PageTitle title="Atendimentos" />

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

        <Grid item xs={12} sm={6}>
          {isFetchingClientes ? (
            <Skeleton
              height="2.5rem"
              style={{ transform: "scale(1)", margin: "0 0 .9375rem" }}
            />
          ) : (
            <Select
              name="pessoaId"
              label="Cliente"
              disabled={!clientes.length || isFetching}
              margin="none"
              size="small"
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
            name="atividade"
            label="Atividade"
            disabled={isFetching}
            margin="none"
            size="small"
          />
        </Grid>
      </FiltersContainer>

      <Table
        state={{ isLoading: isFetching }}
        columns={[
          {
            accessorKey: "dataAtendimento",
            header: "Data",
            size: 2,
            Cell: ({ row: { original } }) => date(original.dataAtendimento),
          },
          { accessorKey: "pessoa.nome", header: "Nome completo", size: 5 },
          { accessorKey: "atividade", header: "Atividade", size: 3 },
          { accessorKey: "usuario.login", header: "Profissional", size: 5 },
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
                      setIdAtendimento([original.id]);
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
                      setOpenModalCreateEditAtendimentos(true);
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
          if (!original.avaliacao && !original.evolucaoSintomas)
            return (
              <Typography variant="body2">
                Não há dados para serem exibidos
              </Typography>
            );

          return (
            <Box display="flex" flexDirection="column" gap="1rem">
              {original.avaliacao && (
                <Box>
                  <Typography variant="subtitle2" fontWeight="bold">
                    Avaliação
                  </Typography>
                  <Typography variant="body2">{original.avaliacao}</Typography>
                </Box>
              )}

              {original.evolucaoSintomas && (
                <Box>
                  <Typography variant="subtitle2" fontWeight="bold">
                    Evolução dos sintomas
                  </Typography>
                  <Typography variant="body2">
                    {original.evolucaoSintomas}
                  </Typography>
                </Box>
              )}
            </Box>
          );
        }}
      />

      <Button
        onClick={() => {
          setOpenModalCreateEditAtendimentos(true);
          setRowData({});
        }}
        size="medium"
        style={{ float: "right", margin: "1.25rem 0 .5rem" }}
      >
        Criar
      </Button>

      {rowData && (
        <ModalCreateEditAtendimentos
          open={openModalCreateEditAtendimentos}
          onClose={(getData) => {
            if (getData) refetch();
            setOpenModalCreateEditAtendimentos(false);
            setTimeout(() => setRowData(null), 300);
          }}
          rowData={rowData}
        />
      )}

      {openConfirmationModal && (
        <ConfirmationModal
          open={openConfirmationModal}
          onClose={onCloseConfirmationModal}
          onConfirm={() => mutate(idAtendimento)}
          isLoading={isLoadingDeleting}
          title="Excluir atendimento?"
          text="Deseja realmente excluir o atendimento? Essa operação não poderá ser desfeita."
        />
      )}
    </Fragment>
  );
}

export default Atendimentos;
