import { createBrowserRouter } from "react-router-dom";

import App from "@/App";
import AuthPage from "@/features/auth/AuthPage";
import Dashboard from "@/features/urls/Dashboard";
import ProtectedRoute from "@components/ProtectedRoute";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      { element: <AuthPage />, index: true },
      { path: "login", element: <AuthPage /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  { path: "", element: "" },
]);
