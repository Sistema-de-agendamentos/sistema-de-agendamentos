import NotFound from "../screens/NotFound";
import Agendamentos from "../screens/Agendamentos";
import Clientes from "../screens/Clientes";

const privateRoutes = [
  { element: <NotFound />, path: "/404" },
  { element: <Agendamentos />, path: "/agendamentos" },
  { element: <Clientes />, path: "/clientes" },
];

export default privateRoutes;
