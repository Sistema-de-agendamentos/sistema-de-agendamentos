import { useEffect } from "react";
import { useNavigate } from "react-router";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import useMutation from "../../hooks/useMutation";
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
  const { clearErrors, handleSubmit } = methods;

  const navigate = useNavigate();

  const {
    data = {},
    mutate,
    isLoading,
    isSuccess,
  } = useMutation({
    endpoint: "/auth",
    successText: "Login efetuado com sucesso",
  });

  const { data: user = {} } = data;
  const { accessToken } = user;

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem("user", JSON.stringify(user));
      if (accessToken) navigate("/agendamentos");
    }
  }, [accessToken, user, isSuccess, navigate]);

  return (
    <PublicScreen title="Login">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(mutate)}>
          <TextField name="login" label="Usuário" disabled={isLoading} />

          <TextField
            name="password"
            label="Senha"
            disabled={isLoading}
            type="password"
          />

          <Button
            type="submit"
            onClick={clearErrors}
            isLoading={isLoading}
            fullWidth
          >
            Entrar
          </Button>

          <Button
            onClick={() => navigate("/esqueceu-senha")}
            disabled={isLoading}
            variant="inherit"
          >
            Esqueceu a senha?
          </Button>
        </form>
      </FormProvider>
    </PublicScreen>
  );
}

export default Login;
