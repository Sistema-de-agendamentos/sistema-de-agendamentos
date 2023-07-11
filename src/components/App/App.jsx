import { ThemeProvider } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import theme from "../../styles/theme";
import Routes from "../../routes";

import "../../styles/index.css";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <Routes />
    </ThemeProvider>
  );
}

export default App;
