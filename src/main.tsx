import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppRouter from "./router/Router.tsx";
import { ThemeProvider } from "./contexts/ThemeContext.tsx";
import { UnifiedAuthProvider } from "./contexts/UnifiedAuthContext.tsx";
import "bootstrap/dist/css/bootstrap.min.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <UnifiedAuthProvider>
        <AppRouter />
      </UnifiedAuthProvider>
    </ThemeProvider>
  </StrictMode>
);
