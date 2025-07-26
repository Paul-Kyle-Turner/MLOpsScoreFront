import LinkToDashboard from "../components/linkButtons/LinkToDashboard";
import LinkToSignIn from "../components/linkButtons/SignIn";
import { SearchBoxLinkOut } from "../components/searchBox/SearchBoxLinkOut";

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
        <LinkToSignIn />
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
            maxWidth: "800px",
            width: "100%",
          }}
        >
          <h1
            style={{
              fontSize: "4rem",
              fontWeight: "800",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "0.5rem",
              textShadow: "0 4px 8px rgba(0,0,0,0.1)",
              letterSpacing: "-2px",
            }}
          >
            RateStack
          </h1>

          <br />
          <SearchBoxLinkOut />
          <br />

          <p
            style={{
              fontSize: "1.25rem",
              color: "#6b7280",
              fontWeight: "400",
              maxWidth: "600px",
              lineHeight: "1.6",
              margin: "0 auto",
              position: "relative",
            }}
          >
            <span
              style={{
                background: "linear-gradient(90deg, #667eea, #764ba2, #667eea)",
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "shimmer 3s ease-in-out infinite",
                fontWeight: "500",
              }}
            >
              Community-driven
            </span>{" "}
            cloud platform evaluations.
          </p>

          <style>{`
            @keyframes shimmer {
              0%, 100% { background-position: 200% 0; }
              50% { background-position: -200% 0; }
            }
          `}</style>
        </div>

        <br />
      </div>
    </div>
  );
};

export default Root;
