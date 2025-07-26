import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UnifiedAuth } from "../components/unifiedAuth";
import { useUnifiedAuth } from "../hooks/useUnifiedAuth";
import { useTheme } from "../hooks/useTheme";
import { ThemeToggle } from "../components/theme/ThemeToggle";
import { RateStackH1 } from "../components/title/title";

const SignIn: React.FC = () => {
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);
  const navigate = useNavigate();
  const { auth } = useUnifiedAuth();
  const { theme } = useTheme();

  // Redirect if already authenticated
  useEffect(() => {
    if (auth) {
      navigate("/dashboard");
    }
  }, [auth, navigate]);

  const handleAuthSuccess = () => {
    setAuthError(null);
    setAuthSuccess("Sign in successful! Redirecting...");

    // Small delay to show success message before redirect
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  const handleAuthError = (error: string) => {
    setAuthError(error);
    setAuthSuccess(null);
  };

  const isDark = theme === "dark";

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: isDark ? "#212529" : "#ffffff",
        color: isDark ? "#e9ecef" : "#212529",
        position: "relative",
        transition: "background-color 0.3s ease, color 0.3s ease",
      }}
    >
      {/* Theme Toggle in top left */}
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

      {/* Main Content */}
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "420px",
            padding: "40px",
            backgroundColor: isDark ? "#343a40" : "#ffffff",
            borderRadius: "12px",
            boxShadow: isDark
              ? "0 10px 40px rgba(0, 0, 0, 0.4)"
              : "0 10px 40px rgba(0, 0, 0, 0.1)",
            border: `1px solid ${isDark ? "#495057" : "#dee2e6"}`,
            transition: "all 0.3s ease",
          }}
        >
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <RateStackH1 />
            <p
              style={{
                fontSize: "18px",
                color: isDark ? "#adb5bd" : "#6c757d",
                margin: "0 0 8px 0",
                fontWeight: "500",
              }}
            >
              Welcome
            </p>
            <p
              style={{
                fontSize: "14px",
                color: isDark ? "#868e96" : "#8a8a8a",
                margin: 0,
                lineHeight: "1.5",
              }}
            >
              Sign in to access your evaluations and contribute to our
              community-driven platform.
            </p>
          </div>

          {/* Success Message */}
          {authSuccess && (
            <div
              style={{
                color: "#28a745",
                backgroundColor: isDark ? "#1e3a2e" : "#d4edda",
                border: `1px solid ${isDark ? "#28a745" : "#c3e6cb"}`,
                borderRadius: "8px",
                padding: "12px 16px",
                marginBottom: "20px",
                fontSize: "14px",
                fontWeight: "500",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
              {authSuccess}
            </div>
          )}

          {/* Error Message */}
          {authError && (
            <div
              style={{
                color: "#dc3545",
                backgroundColor: isDark ? "#3a1e1e" : "#f8d7da",
                border: `1px solid ${isDark ? "#dc3545" : "#f5c6cb"}`,
                borderRadius: "8px",
                padding: "12px 16px",
                marginBottom: "20px",
                fontSize: "14px",
                fontWeight: "500",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              {authError}
            </div>
          )}

          {/* Authentication Component */}
          <div style={{ marginBottom: "24px" }}>
            <UnifiedAuth
              onSuccess={handleAuthSuccess}
              onError={handleAuthError}
              startOpen={true}
              noCloseButton={true}
            />
          </div>

          {/* Divider */}
          <div
            style={{
              height: "1px",
              backgroundColor: isDark ? "#495057" : "#dee2e6",
              margin: "24px 0",
              position: "relative",
            }}
          >
            <span
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: isDark ? "#343a40" : "#ffffff",
                padding: "0 16px",
                fontSize: "12px",
                color: isDark ? "#868e96" : "#8a8a8a",
                fontWeight: "500",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              New Here?
            </span>
          </div>

          {/* Sign Up Information */}
          <div
            style={{
              textAlign: "center",
              padding: "16px",
              backgroundColor: isDark ? "#2c3034" : "#f8f9fa",
              borderRadius: "8px",
              border: `1px solid ${isDark ? "#495057" : "#dee2e6"}`,
            }}
          >
            <p
              style={{
                margin: "0 0 12px 0",
                fontSize: "14px",
                color: isDark ? "#adb5bd" : "#6c757d",
                lineHeight: "1.5",
              }}
            >
              Don't have an account? No worries! Simply sign in with any of the
              methods above to create your account automatically.
            </p>
            <p
              style={{
                margin: 0,
                fontSize: "12px",
                color: isDark ? "#868e96" : "#8a8a8a",
                fontStyle: "italic",
              }}
            >
              Your first login will set up your profile in our community.
            </p>
          </div>

          {/* Footer Links */}
          <div
            style={{
              marginTop: "24px",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            <Link
              to="/"
              style={{
                color: isDark ? "#adb5bd" : "#6c757d",
                textDecoration: "none",
                fontSize: "12px",
                fontWeight: "500",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = isDark ? "#e9ecef" : "#007bff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = isDark ? "#adb5bd" : "#6c757d";
              }}
            >
              Explore Platforms
            </Link>
            <span style={{ color: isDark ? "#495057" : "#dee2e6" }}>•</span>
            <Link
              to="/dashboard"
              style={{
                color: isDark ? "#adb5bd" : "#6c757d",
                textDecoration: "none",
                fontSize: "12px",
                fontWeight: "500",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = isDark ? "#e9ecef" : "#007bff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = isDark ? "#adb5bd" : "#6c757d";
              }}
            >
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
