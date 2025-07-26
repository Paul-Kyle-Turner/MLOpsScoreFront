import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppRouter from "./router/Router.tsx";
import { ThemeProvider } from "./contexts/ThemeContext.tsx";
import { SlackAuthProvider } from "./contexts/SlackAuthContext.tsx";
import { FirebaseAuthProvider } from "./contexts/FirebaseAuthContext.tsx";
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <FirebaseAuthProvider>
        <SlackAuthProvider>
          <AppRouter />
        </SlackAuthProvider>
      </FirebaseAuthProvider>
    </ThemeProvider>
  </StrictMode>
);
