import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthState } from "./context/AuthState.jsx";
import { Home, Login, SignUp } from "./components";
import AuthLayout from "./components/AuthLayout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: (
      <AuthLayout authentication={false}>
        <Login />
      </AuthLayout>
    ),
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthState>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </AuthState>
  </React.StrictMode>
);
