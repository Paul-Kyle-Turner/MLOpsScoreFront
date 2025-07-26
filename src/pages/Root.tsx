import LinkToDashboard from "../components/linkButtons/LinkToDashboard";
import { SearchBoxLinkOut } from "../components/searchBox/SearchBoxLinkOut";
import { Link } from "react-router-dom";

const Root = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          display: "flex",
          gap: "10px",
        }}
      >
        <Link
          to="/signin"
          style={{
            padding: "12px 24px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "500",
            textDecoration: "none",
            display: "inline-block",
            transition: "background-color 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#e9ecef";
            e.currentTarget.style.color = "#495057";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#f8f9fa";
            e.currentTarget.style.color = "#6c757d";
          }}
        >
          Sign In
        </Link>
        <LinkToDashboard children="Dashboard" />
      </div>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "20px",
            maxWidth: "600px",
          }}
        >
          <h1>RateStack</h1>

          <br />
          <SearchBoxLinkOut />
          <br />

          <p>Community-driven cloud platform evaluations.</p>

          <p>
            We request that you be a part of our community to contribute and
            improve the platform.
          </p>
        </div>

        <br />
      </div>
    </div>
  );
};

export default Root;
