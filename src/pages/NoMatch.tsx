import { useNavigate } from "react-router-dom";
import BasePage from "./Base";

const NoMatch = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/dashboard");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <BasePage title="Page Not Found - MLOps Platform Score" noSearch={true}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "40px 20px",
          minHeight: "60vh",
        }}
      >
        <div style={{ marginBottom: "30px" }}>
          <h1
            style={{
              fontSize: "6rem",
              fontWeight: "bold",
              color: "#ef4444",
              margin: "0",
              lineHeight: "1",
            }}
          >
            404
          </h1>
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: "600",
              margin: "10px 0",
              color: "var(--text-primary)",
            }}
          >
            Page Not Found
          </h2>
        </div>

        <p
          style={{
            fontSize: "1.1rem",
            color: "var(--text-secondary)",
            marginBottom: "30px",
            maxWidth: "500px",
            lineHeight: "1.6",
          }}
        >
          Sorry, we couldn't find the page you're looking for. It might have
          been moved, deleted, or you entered the wrong URL.
        </p>

        <div
          style={{
            display: "flex",
            gap: "15px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <button
            onClick={handleGoHome}
            style={{
              padding: "12px 24px",
              backgroundColor: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "1rem",
              fontWeight: "500",
              cursor: "pointer",
              transition: "background-color 0.2s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#2563eb";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#3b82f6";
            }}
          >
            Go to Dashboard
          </button>
          <button
            onClick={handleGoBack}
            style={{
              padding: "12px 24px",
              backgroundColor: "transparent",
              color: "var(--text-primary)",
              border: "2px solid var(--border-color)",
              borderRadius: "8px",
              fontSize: "1rem",
              fontWeight: "500",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "var(--hover-bg)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            Go Back
          </button>
        </div>
      </div>
    </BasePage>
  );
};

export default NoMatch;
