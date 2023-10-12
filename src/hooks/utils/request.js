async function request({
  endpoint,
  method,
  body: data = null,
  useAuthorizationHeader = true,
}) {
  const user = JSON.parse(localStorage.getItem("user"));

  const url = `${process.env.REACT_APP_API_URL}${endpoint}`;
  const body = data ? JSON.stringify(data) : null;
  const headers = {
    "Content-Type": "application/json",
    ...(useAuthorizationHeader && {
      Authorization: `Bearer ${user.accessToken}`,
    }),
  };

  try {
    const response = await fetch(url, { method, body, headers, mode: "cors" });
    const json = await response.json();

    if (response.ok) return json;
    return Promise.reject(json.messages.join(", "));
  } catch (error) {
    return Promise.reject(
      new Error(
        "Ocorreu um erro interno. Por favor, entre em contato com o suporte."
      )
    );
  }
}

export default request;
