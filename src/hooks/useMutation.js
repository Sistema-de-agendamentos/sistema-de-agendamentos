import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import request from "./utils/request";

function useCustomMutation({
  key = null,
  endpoint = "",
  method = "POST",
  mutationOptions = {},
  successText = "Operação concluída com sucesso",
}) {
  const mutationKey = key ? [key] : [endpoint, method];

  return useMutation(
    mutationKey,
    (body = null) => request({ endpoint, method, body }),
    {
      onSuccess: () => {
        if (successText) toast.success(successText);
        return successText;
      },
      onError: (error) => {
        const errorMessage = error.message || error;

        toast.error(errorMessage);
        return errorMessage;
      },
      onSettled: () => {},
      ...mutationOptions,
    }
  );
}

export default useCustomMutation;
