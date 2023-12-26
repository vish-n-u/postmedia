import React, { createContext } from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import AuthPage from "./pages/authentication";
import { createBrowserRouter, json, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import Home from "./pages/home";
const root = createRoot(document.getElementById("root"));
export const setupLogging = () => {
  if (process.env.NODE_ENV === "production") {
    // Override console methods with empty functions (hiding logs in production)
    console.log = () => {};
    console.warn = () => {};
    console.error = () => {};
    console.info = () => {};
  }
};
setupLogging();

function userInfo() {
  return localStorage.getItem("user");
}

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "/",
    element: <Home />,
  },
]);

root.render(
  <ChakraProvider>
      <RouterProvider router={router} />
  </ChakraProvider>
);

reportWebVitals();