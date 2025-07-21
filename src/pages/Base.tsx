import React from "react";
import { ThemeToggle } from "../components/theme/ThemeToggle";

interface BasePageProps {
  children: React.ReactNode;
  title?: string;
}

const BasePage: React.FC<BasePageProps> = ({
  children,
  title = "MLOps Platform Scores",
}) => {
  return (
    <div>
      <header>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1rem",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              textAlign: "center",
            }}
          >
            <h1>{title}</h1>
          </div>
          <div
            style={{
              width: "120px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <ThemeToggle variant="icon" size="md" />
          </div>
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
};

export default BasePage;
