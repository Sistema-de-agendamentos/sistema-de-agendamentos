import { useCallback } from "react";
import { useNavigate } from "react-router";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Button from "../../components/Button";
import TextField from "../../components/TextField";
import PublicScreen from "../../components/PublicScreen";

const defaultValues = {
  login: "",
  password: "",
};

const schema = yup.object().shape({
  login: yup.string().required("Login é obrigatório"),
  password: yup.string().required("Senha é obrigatório"),
});

function Login() {
  const methods = useForm({ defaultValues, resolver: yupResolver(schema) });
  const { handleSubmit } = methods;

  const navigate = useNavigate();

  const submit = useCallback(() => {
    // eslint-disable-next-line no-console
    console.log("submit");
  }, []);

  return (
    <PublicScreen title="Login">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(submit)}>
          <TextField name="login" label="Usuário" />
          <TextField name="password" label="Senha" />
          <Button type="submit" onClick={() => {}} fullWidth>
            Entrar
          </Button>

          <Button onClick={() => navigate("/esqueceu-senha")} variant="inherit">
            Esqueceu a senha?
          </Button>
        </form>
      </FormProvider>
    </PublicScreen>
  );
}

export default Login;
