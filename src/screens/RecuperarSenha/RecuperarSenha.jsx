import { useCallback } from "react";
import { useNavigate } from "react-router";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Typography from "@mui/material/Typography";

import Button from "../../components/Button";
import TextField from "../../components/TextField";
import PublicScreen from "../../components/PublicScreen";

const defaultValues = {
  login: "",
};

const schema = yup.object().shape({
  login: yup.string().required("Senha é obrigatório"),
});

function RecuperarSenha() {
  const methods = useForm({ defaultValues, resolver: yupResolver(schema) });
  const { handleSubmit } = methods;

  const navigate = useNavigate();

  const submit = useCallback(() => {
    // eslint-disable-next-line no-console
    console.log("submit");
  }, []);

  return (
    <PublicScreen title="Esqueceu a senha?">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(submit)}>
          <Typography paragraph style={{ margin: "1.3125rem 0 1.125rem" }}>
            Digite o login cadastrado para enviarmos um link para a recuperação
            da senha para o seu e-mail
          </Typography>

          <TextField name="login" label="Login" />
          <Button type="submit" onClick={() => {}} fullWidth>
            Enviar
          </Button>

          <Button onClick={() => navigate("/")} variant="inherit">
            Deseja fazer login?
          </Button>
        </form>
      </FormProvider>
    </PublicScreen>
  );
}

export default RecuperarSenha;
