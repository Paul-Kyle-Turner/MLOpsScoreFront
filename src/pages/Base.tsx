import React from "react";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "../components/theme/ThemeToggle";
import { SearchBoxLinkOut } from "../components/searchBox/SearchBoxLinkOut";

interface BasePageProps {
  children: React.ReactNode;
  title?: string;
  noSearch?: boolean;
  noHome?: boolean;
}

const BasePage: React.FC<BasePageProps> = ({
  children,
  title = "MLOps Community Platform Scores",
  noSearch = false,
  noHome = false,
}) => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/dashboard");
  };

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
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          <div
            style={{
              width: "200px",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            {!noHome && (
              <button
                onClick={handleHomeClick}
                style={{
                  background: "transparent",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  padding: "0.5rem 1rem",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                }}
              >
                Home
              </button>
            )}
            <ThemeToggle variant="icon" size="md" />
          </div>
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
              width: "300px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            {!noSearch && <SearchBoxLinkOut />}
          </div>
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
};

export default BasePage;
