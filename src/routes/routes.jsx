import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import { Layout } from "components";
import { useAuthStore } from "stores";

import privateRoutes from "./private.routes";
import publicRoutes from "./public.routes";

function AppRoutes() {
  const { isAuthenticated } = useAuthStore();

  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes.map(({ element, path }) => (
          <Route key={path} element={element} path={path} />
        ))}

        <Layout>
          {privateRoutes.map(({ element, path }) => (
            <Route
              key={path}
              element={isAuthenticated ? element : <Navigate to="/" replace />}
              path={path}
            />
          ))}
        </Layout>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
