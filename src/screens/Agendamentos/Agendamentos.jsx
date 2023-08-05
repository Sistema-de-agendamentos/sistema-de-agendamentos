/* eslint-disable no-console */
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

import { useQuery } from "hooks";

import Icon from "../../components/Icon";
import TextField from "../../components/TextField";
import PageTitle from "../../components/PageTitle";
import FiltersContainer from "../../components/FiltersContainer";
import Table from "../../components/Table";

const defaultValues = {
  nome: "",
  data: "",
  celular: "",
  status: "",
};

// eslint-disable-next-line no-unused-vars
const mock = [
  {
    name: { firstName: "John", lastName: "Doe" },
    address: "261 Erdman Ford",
    city: "East Daphne",
    state: "Kentucky",
  },
  {
    name: { firstName: "Jane", lastName: "Doe" },
    address: "769 Dominic Grove",
    city: "Columbus",
    state: "Ohio",
  },
  {
    name: { firstName: "Joe", lastName: "Doe" },
    address: "566 Brakus Inlet",
    city: "South Linda",
    state: "West Virginia",
  },
  {
    name: { firstName: "Kevin", lastName: "Vandy" },
    address: "722 Emie Stream",
    city: "Lincoln",
    state: "Nebraska",
  },
  {
    name: { firstName: "Joshua", lastName: "Rolluffs" },
    address: "32188 Larkin Turnpike",
    city: "Charleston",
    state: "South Carolina",
  },
];

function Agendamentos() {
  const methods = useForm({ defaultValues });
  const { watch } = methods;
  // eslint-disable-next-line no-unused-vars
  const watchValues = watch();

  const {
    data = [],
    refetch,
    isFetching,
  } = useQuery({ endpoint: "/agendamento" });

  return (
    <Fragment>
      <PageTitle title="Agendamentos" />

      <FiltersContainer methods={methods} submit={refetch}>
        <Grid item xs={12} sm={6}>
          <TextField
            name="nome"
            label="Nome do cliente"
            margin="none"
            size="small"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            name="data"
            label="Data da consulta"
            margin="none"
            size="small"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            name="celular"
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
          { accessorKey: "dataAgendamento", header: "Data", size: 2 },
          { accessorKey: "horarioAgendamento", header: "Horário", size: 2 },
          { accessorKey: "nomePessoa", header: "Nome completo", size: 4 },
          { accessorKey: "status", header: "Status", size: 2 },
          { accessorKey: "celular", header: "Celular", size: 2 },
          { accessorKey: "nomeProfissional", header: "Profissional", size: 4 },
          {
            accessorKey: "botoes",
            header: "",
            enableColumnActions: false,
            size: 1,
            Cell: ({ row: { original } }) => (
              <Box sx={{ display: "flex", margin: "-.75rem .5rem" }}>
                <Tooltip arrow placement="left" title="Excluir">
                  <IconButton
                    color="error"
                    onClick={() => console.log("Delete", original)}
                    style={{ padding: ".25rem" }}
                  >
                    <Icon name="Delete" />
                  </IconButton>
                </Tooltip>

                <Tooltip arrow placement="right" title="Editar">
                  <IconButton
                    onClick={() => console.log("Edit", original)}
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
    </Fragment>
  );
}

export default Agendamentos;
