import React, { useState, useEffect } from "react";
import { useFirebaseAuth } from "../../hooks/useFirebaseAuth";
import { SlackLogin } from "../slackLogin/SlackLogin";

interface UnifiedAuthProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export const UnifiedAuth: React.FC<UnifiedAuthProps> = ({
  onSuccess,
  onError,
}) => {
  const [showAuthOptions, setShowAuthOptions] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { loginWithGoogle, loginWithGitHub } = useFirebaseAuth();

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await loginWithGoogle();
      onSuccess?.();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Google login failed";
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGitHubLogin = async () => {
    setIsLoading(true);
    try {
      await loginWithGitHub();
      onSuccess?.();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "GitHub login failed";
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowAuthOptions = () => {
    setShowAuthOptions(true);
    setIsAnimating(false); // Start with animation off
    setIsClosing(false); // Reset closing state
  };

  const handleCloseAuthOptions = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowAuthOptions(false);
      setIsAnimating(false);
      setIsClosing(false);
    }, 300); // Match transition duration
  };

  // Trigger animation when auth options are shown
  useEffect(() => {
    if (showAuthOptions && !isAnimating && !isClosing) {
      // Small delay to ensure the element is mounted before animating
      const timer = setTimeout(() => setIsAnimating(true), 10);
      return () => clearTimeout(timer);
    }
  }, [showAuthOptions, isAnimating, isClosing]);

  if (!showAuthOptions) {
    return (
      <div style={{ textAlign: "center" }}>
        <button
          onClick={handleShowAuthOptions}
          style={{
            padding: "12px 24px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontSize: "16px",
            cursor: "pointer",
            fontWeight: "600",
            transition: "all 0.3s ease",
            transform: "scale(1)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.backgroundColor = "#0056b3";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.backgroundColor = "#007bff";
          }}
        >
          Sign In
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        textAlign: "center",
        maxHeight: showAuthOptions ? "500px" : "60px", // Smooth height transition
        overflow: "hidden",
        transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {/* Always render both states, but conditionally show them */}
      <div
        style={{
          opacity: showAuthOptions ? 0 : 1,
          transform: showAuthOptions ? "scale(0.95)" : "scale(1)",
          transition: "all 0.3s ease",
          position: showAuthOptions ? "absolute" : "relative",
          pointerEvents: showAuthOptions ? "none" : "auto",
        }}
      >
        <button
          onClick={handleShowAuthOptions}
          style={{
            padding: "12px 24px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontSize: "16px",
            cursor: "pointer",
            fontWeight: "600",
            transition: "all 0.3s ease",
            transform: "scale(1)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.backgroundColor = "#0056b3";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.backgroundColor = "#007bff";
          }}
        >
          Sign In
        </button>
      </div>

      {/* Auth options panel */}
      <div
        style={{
          maxWidth: "256px",
          margin: "0 auto",
          opacity: isClosing ? 0 : isAnimating ? 1 : 0,
          transform: isClosing
            ? "translateY(-20px) scale(0.95)"
            : isAnimating
            ? "translateY(0) scale(1)"
            : "translateY(-20px) scale(0.95)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          position: showAuthOptions ? "relative" : "absolute",
          pointerEvents: showAuthOptions ? "auto" : "none",
        }}
      >
      <h3
        style={{
          marginBottom: "20px",
          color: "white",
          opacity: isClosing ? 0 : isAnimating ? 1 : 0,
          transform: isClosing
            ? "translateY(-10px)"
            : isAnimating
            ? "translateY(0)"
            : "translateY(-10px)",
          transition: "all 0.3s ease 0.1s",
        }}
      >
        Sign In
      </h3>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          opacity: isClosing ? 0 : isAnimating ? 1 : 0,
          transform: isClosing
            ? "translateY(10px)"
            : isAnimating
            ? "translateY(0)"
            : "translateY(10px)",
          transition: "all 0.3s ease 0.2s",
        }}
      >
        {/* Google Sign In */}
        <button
          onClick={handleGoogleLogin}
          disabled={isLoading}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "12px 20px",
            backgroundColor: "#db4437",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontSize: "16px",
            cursor: isLoading ? "not-allowed" : "pointer",
            fontWeight: "600",
            width: "100%",
            height: "48px",
            transition: "all 0.2s ease",
            transform: "translateY(0)",
            opacity: isClosing ? 0 : isAnimating ? 1 : 0,
          }}
          onMouseEnter={(e) => {
            if (!isLoading) {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 4px 12px rgba(219, 68, 55, 0.3)";
              e.currentTarget.style.backgroundColor = "#c23321";
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
            e.currentTarget.style.backgroundColor = "#db4437";
          }}
        >
          <svg
            style={{ width: "20px", height: "20px", marginRight: "10px" }}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Sign in with Google
        </button>

        {/* GitHub Sign In */}
        <button
          onClick={handleGitHubLogin}
          disabled={isLoading}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "12px 20px",
            backgroundColor: "#333",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontSize: "16px",
            cursor: isLoading ? "not-allowed" : "pointer",
            fontWeight: "600",
            width: "100%",
            height: "48px",
            transition: "all 0.2s ease",
            transform: "translateY(0)",
            opacity: isClosing ? 0 : isAnimating ? 1 : 0,
          }}
          onMouseEnter={(e) => {
            if (!isLoading) {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 4px 12px rgba(51, 51, 51, 0.3)";
              e.currentTarget.style.backgroundColor = "#24292e";
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
            e.currentTarget.style.backgroundColor = "#333";
          }}
        >
          <svg
            style={{ width: "20px", height: "20px", marginRight: "10px" }}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
          </svg>
          Sign in with GitHub
        </button>

        {/* Slack Sign In */}
        <div
          style={{
            width: "100%",
            opacity: isClosing ? 0 : isAnimating ? 1 : 0,
            transform: isClosing
              ? "translateY(10px)"
              : isAnimating
              ? "translateY(0)"
              : "translateY(10px)",
            transition: "all 0.3s ease 0.25s",
          }}
        >
          <SlackLogin />
        </div>
      </div>

      <button
        onClick={handleCloseAuthOptions}
        style={{
          marginTop: "20px",
          padding: "8px 16px",
          backgroundColor: "#6c757d",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "14px",
          opacity: isClosing ? 0 : isAnimating ? 1 : 0,
          transform: isClosing
            ? "translateY(10px)"
            : isAnimating
            ? "translateY(0)"
            : "translateY(10px)",
          transition: "all 0.3s ease 0.3s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#5a6268";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#6c757d";
        }}
      >
        Close
      </button>
      </div>
    </div>
  );
};
