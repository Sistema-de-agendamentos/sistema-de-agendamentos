async function request({ endpoint, method, body: data = null }) {
  const url = `${process.env.API_URL || "http://localhost"}${endpoint}`;
  const body = data ? JSON.stringify(data) : null;
  const headers = { "Content-Type": "application/json" };

  const response = await fetch(url, { method, body, headers });
  const json = await response.json();

  if (response.ok) return json;
  return Promise.reject(json.messages.join(", "));
}

export default request;
