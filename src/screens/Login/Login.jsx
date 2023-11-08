import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

import { useQuery } from "hooks";
import { useAuthStore } from "stores";

import useMutation from "../../hooks/useMutation";
import Button from "../../components/Button";
import Icon from "../../components/Icon";
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
  const { setAuthentication, setUser } = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);

  const methods = useForm({ defaultValues, resolver: yupResolver(schema) });
  const { clearErrors, handleSubmit } = methods;

  const savedUser = useMemo(
    () => JSON.parse(localStorage.getItem("user")) || {},
    []
  );
  const haveSavedUser = !!Object.keys(savedUser).length;

  const onSuccess = useCallback(
    (queryData) => {
      if (queryData?.data?.accessToken || queryData?.refreshToken) {
        const newUser = queryData?.data || {
          ...savedUser,
          refreshToken: queryData?.refreshToken,
        };

        navigate("/agendamentos");
        setAuthentication(true);
        setUser(newUser);
      }
    },
    [navigate, savedUser, setAuthentication, setUser]
  );

  const { mutate: mutateLogin, isLoading: isLoadingLogin } = useMutation({
    endpoint: "/auth",
    useAuthorizationHeader: false,
    successText: "Autenticado com sucesso",
    mutationOptions: { onSuccess },
  });

  useQuery({
    endpoint: "/auth/refresh",
    useAuthorizationHeader: false,
    method: "POST",
    body: { refreshToken: savedUser.refreshToken },
    successText: "Reautenticado com sucesso",
    queryOptions: {
      enabled: haveSavedUser,
      onSuccess,
      onError: () => {
        localStorage.removeItem("user");
        setAuthentication(false);
        window.location.reload();
      },
    },
  });

  if (haveSavedUser)
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
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    <Icon
                      name={showPassword ? "Visibility" : "VisibilityOff"}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              "& input": {
                "-webkit-text-security": showPassword ? "none" : "disc",
              },
            }}
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
