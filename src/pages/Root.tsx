import LinkToDashboard from "../components/linkButtons/LinkToDashboard";
import LinkToSignIn from "../components/linkButtons/SignIn";
import { SearchBoxLinkOut } from "../components/searchBox/SearchBoxLinkOut";
import ThemeToggle from "../components/theme/ThemeToggle";
import { RateStackH1 } from "../components/title/title";

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
          left: "20px",
          zIndex: 10,
        }}
      >
        <ThemeToggle />
      </div>
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
          <RateStackH1 />
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
                background:
                  "linear-gradient(90deg, #667eea, #703fa1ff, #667eea)",
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
