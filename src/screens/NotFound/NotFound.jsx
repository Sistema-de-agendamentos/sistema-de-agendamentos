import { Fragment } from "react";
import Typography from "@mui/material/Typography";

import PageTitle from "../../components/PageTitle";

function NotFound() {
  return (
    <Fragment>
      <PageTitle title="Erro 404" />

      <Typography paragraph style={{ margin: "2rem 0" }}>
        Desculpe, não encontramos a página desejada. Por favor, selecione outra
        página no menu ao lado esquerdo.
      </Typography>
    </Fragment>
  );
}

export default NotFound;
