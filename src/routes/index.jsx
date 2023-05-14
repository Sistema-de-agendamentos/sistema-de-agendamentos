import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import publicRoutes from "./public.routes";
import privateRoutes from "./private.routes";

function AppRoutes() {
  const routes = [...publicRoutes, ...privateRoutes];

  return (
    <BrowserRouter>
      <Routes>
        {routes.map(({ element, path }) => (
          <Route key={path} element={element} path={path} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
