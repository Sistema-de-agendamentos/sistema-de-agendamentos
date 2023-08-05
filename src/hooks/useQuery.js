import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

import request from "./utils/request";

const ONE_SECOND = 1000;
const ONE_MINUTE = ONE_SECOND * 60;
const ONE_HOUR = ONE_MINUTE * 60;

function useCustomQuery({
  key = null,
  endpoint = "",
  method = "GET",
  body = null,
  queryOptions = {},
  successText = "",
  useAuthorizationHeader = true,
}) {
  const queryKey = key ? [key] : [endpoint, body];

  return useQuery(
    queryKey,
    () => request({ endpoint, method, body, useAuthorizationHeader }),
    {
      enabled: false,
      cacheTime: ONE_HOUR,
      staleTime: ONE_HOUR,
      retry: false,
      refetchOnWindowFocus: false,
      ...queryOptions,
      onSuccess: (data) => {
        if (successText) toast.success(successText);
        if (queryOptions?.onSuccess) queryOptions.onSuccess(data);
      },
      onError: (error) => {
        const errorMessage = error.message || error;
        toast.error(errorMessage);

        if (queryOptions?.onError) queryOptions.onError(errorMessage);
      },
    }
  );
}

export default useCustomQuery;
