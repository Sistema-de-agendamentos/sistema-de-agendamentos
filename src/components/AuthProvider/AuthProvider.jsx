import { useNavigate } from "react-router";

import { useAuthStore } from "../../stores";
import { useQuery } from "../../hooks";
import LoadingPage from "../../screens/LoadingPage";
import App from "../App/App";

function AuthProvider() {
  const { setAuthentication } = useAuthStore();
  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  const { isFetching } = useQuery({
    endpoint: "/auth/refresh",
    method: "POST",
    body: { refreshToken: user?.refreshToken },
    successText: "Relogado efetuado com sucesso",
    queryOptions: {
      enabled: !!user,
      onSuccess: (data = {}) => {
        const { data: newUser = {} } = data;
        const { accessToken } = newUser;

        localStorage.setItem("user", JSON.stringify(newUser));
        if (accessToken) {
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

  if (isFetching)
    return (
      <LoadingPage text="Por favor aguarde, estamos reautenticando o seu login" />
    );

  return <App />;
}

export default AuthProvider;
