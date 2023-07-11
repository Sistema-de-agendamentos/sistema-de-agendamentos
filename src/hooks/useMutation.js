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
      ...mutationOptions,
      onSuccess: (data) => {
        if (successText) toast.success(successText);
        if (mutationOptions?.onSuccess) mutationOptions.onSuccess(data);
      },
      onError: (error) => {
        const errorMessage = error.message || error;
        toast.error(errorMessage);

        if (mutationOptions?.onError) mutationOptions.onError(errorMessage);
        return errorMessage;
      },
    }
  );
}

export default useCustomMutation;
