import { useEffect } from "react";
import { useNavigate } from "react-router";

import { useAuthStore } from "../../stores";
import { useQuery } from "../../hooks";
import LoadingPage from "../../screens/LoadingPage";

function AuthProvider({ children }) {
  const { setAuthentication } = useAuthStore();
  const user = JSON.parse(localStorage.getItem("user"));

  // const [reauthenticate, setReauthenticate] = useState(false);

  const navigate = useNavigate();

  const { refetch, isFetching } = useQuery({
    endpoint: "/auth/refresh",
    method: "POST",
    body: { refreshToken: user?.refreshToken },
    successText: "Relogado com sucesso",
    queryOptions: {
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
      // onSettled: () => setReauthenticate(false),
    },
  });

  useEffect(() => {
    if (user) refetch();
  }, [refetch, user]);

  if (!user) navigate("/");

  if (isFetching)
    return (
      <LoadingPage text="Por favor aguarde, estamos reautenticando o seu login" />
    );

  return children;
}

export default AuthProvider;
