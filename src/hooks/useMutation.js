import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

import { useAuthStore } from "stores";

import request from "./utils/request";

function useCustomMutation({
  key = null,
  endpoint = "",
  method = "POST",
  mutationOptions = {},
  successText = "Operação concluída com sucesso",
  useAuthorizationHeader = true,
}) {
  const mutationKey = key ? [key] : [endpoint, method];

  const { setAuthentication, setUser } = useAuthStore();
  const navigate = useNavigate();

  return useMutation(
    mutationKey,
    (body = null) =>
      request({ endpoint, method, body, useAuthorizationHeader }),
    {
      ...mutationOptions,
      onSuccess: (data) => {
        if (successText) toast.success(successText);
        if (mutationOptions?.onSuccess) mutationOptions.onSuccess(data);
      },
      onError: (error) => {
        const errorMessage = error.message || error;
        toast.error(errorMessage);

        if (errorMessage === "Sessão expirada") {
          localStorage.removeItem("user");
          navigate("/");
          setAuthentication(false);
          setUser({});
        }

        if (mutationOptions?.onError) mutationOptions.onError(errorMessage);
        return errorMessage;
      },
    }
  );
}

export default useCustomMutation;
