import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import { useAuthStore } from "stores";

import Layout from "../components/Layout";

import privateRoutes from "./private.routes";
import publicRoutes from "./public.routes";

function AppRoutes() {
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    if (Object.keys(user).length)
      localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <Routes>
      {publicRoutes.map(({ element, path }) => (
        <Route key={path} element={element} path={path} />
      ))}

      {privateRoutes.map(({ element, path }) => (
        <Route
          key={path}
          element={
            isAuthenticated ? (
              <Layout>{element}</Layout>
            ) : (
              <Navigate to="/" replace />
            )
          }
          path={path}
        />
      ))}

      <Route element={<Navigate to="/404" replace />} path="*" />
    </Routes>
  );
}

export default AppRoutes;
