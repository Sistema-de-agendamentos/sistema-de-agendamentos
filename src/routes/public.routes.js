import Login from "../screens/Login";
import RecuperarSenha from "../screens/RecuperarSenha";

const publicRoutes = [
  { element: <Login />, path: "/" },
  { element: <RecuperarSenha />, path: "/esqueceu-senha" },
];

export default publicRoutes;
