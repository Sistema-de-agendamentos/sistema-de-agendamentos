import { useNavigate } from "react-router";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useQuery } from "hooks";
import { useAuthStore } from "stores";

import useMutation from "../../hooks/useMutation";
import Button from "../../components/Button";
import TextField from "../../components/TextField";
import PublicScreen from "../../components/PublicScreen";
import LoadingPage from "../LoadingPage";

const defaultValues = {
  login: "",
  password: "",
};

const schema = yup.object().shape({
  login: yup.string().required("Login é obrigatório"),
  password: yup.string().required("Senha é obrigatório"),
});

function Login() {
  const navigate = useNavigate();
  const { setAuthentication } = useAuthStore();

  const methods = useForm({ defaultValues, resolver: yupResolver(schema) });
  const { clearErrors, handleSubmit } = methods;

  const {
    mutate: mutateLogin,
    isLoading: isLoadingLogin,
    isSuccess: isSuccessLogin,
  } = useMutation({
    endpoint: "/auth",
    successText: "Autenticado com sucesso",
    mutationOptions: {
      onSuccess: (dataLogin = {}) => {
        const { data: userLogin = {} } = dataLogin;
        const { accessToken: accessTokenLogin } = userLogin;

        localStorage.setItem("user", JSON.stringify(userLogin));

        if (accessTokenLogin) {
          navigate("/agendamentos");
          setAuthentication(true);
        }
      },
    },
  });

  const user = JSON.parse(localStorage.getItem("user"));

  const { isFetching: isFetchingReauthenticate } = useQuery({
    endpoint: "/auth/refresh",
    method: "POST",
    body: { refreshToken: user?.refreshToken },
    successText: "Reautenticado com sucesso",
    queryOptions: {
      enabled: !!user && !isSuccessLogin,
      onSuccess: (queryData = {}) => {
        const { accessToken: accessTokenRefresh } = queryData;
        localStorage.setItem("user", JSON.stringify(queryData));

        if (accessTokenRefresh) {
          navigate("/agendamentos");
          setAuthentication(true);
        }
      },
      onError: () => {
        localStorage.removeItem("user");
        setAuthentication(false);
      },
    },
  });

  if (isFetchingReauthenticate)
    return (
      <LoadingPage text="Por favor aguarde, estamos reautenticando o seu login" />
    );

  return (
    <PublicScreen title="Login">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(mutateLogin)}>
          <TextField name="login" label="Usuário" disabled={isLoadingLogin} />

          <TextField
            name="password"
            label="Senha"
            disabled={isLoadingLogin}
            type="password"
          />

          <Button
            type="submit"
            onClick={clearErrors}
            isLoading={isLoadingLogin}
            fullWidth
          >
            Entrar
          </Button>

          <Button
            onClick={() => navigate("/esqueceu-senha")}
            disabled={isLoadingLogin}
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
