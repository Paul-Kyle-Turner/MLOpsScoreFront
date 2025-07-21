import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppRouter from "./router/Router.tsx";
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>
);
