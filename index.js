import React from "react";
import ReactDOM from "react-dom/client";
import "./public/style.css";
import App from "./src/App";
import { ProSidebarProvider } from "react-pro-sidebar";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ProSidebarProvider>
      <App />
    </ProSidebarProvider>
  </React.StrictMode>
);
