import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material";

import theme from "./styles/theme";
import Login from "./screens/Login";

import "./styles/styles.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Login />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
