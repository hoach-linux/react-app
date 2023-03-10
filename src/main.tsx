import React from "react";
import ReactDOM from "react-dom/client";

import "./style/index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { RouterProvider } from "react-router-dom";
import { routes } from "./router/routes";
import Circular from "./components/Circular";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={routes} fallbackElement={<Circular />} />
  </React.StrictMode>
);
