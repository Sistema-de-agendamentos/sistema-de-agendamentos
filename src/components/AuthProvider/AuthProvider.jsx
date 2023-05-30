import { useEffect } from "react";
import { useAuthStore } from "../../stores";
import { useQuery } from "../../hooks";
import LoadingPage from "../../screens/LoadingPage";
import App from "../App/App";

function AuthProvider() {
  const { setAuthentication } = useAuthStore();
  const user = localStorage.getItem("user");

  const { data, isFetching } = useQuery({
    endpoint: "/verificar-token",
    successText: "Relogado efetuado com sucesso",
    queryOptions: { enabled: !!user },
  });

  useEffect(() => setAuthentication(!!data), [data, setAuthentication]);

  if (isFetching)
    return (
      <LoadingPage text="Por favor aguarde, estamos reautenticando o seu login" />
    );

  return <App />;
}

export default AuthProvider;
