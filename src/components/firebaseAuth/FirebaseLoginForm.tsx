import React, { useState } from "react";
import { useFirebaseAuth } from "../../hooks/useFirebaseAuth";

interface FirebaseLoginFormProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export const FirebaseLoginForm: React.FC<FirebaseLoginFormProps> = ({ 
  onSuccess, 
  onError 
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [displayName, setDisplayName] = useState("");

  const { login, register, loginWithGoogle, resetPassword } = useFirebaseAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        await register(email, password, displayName || undefined);
      } else {
        await login(email, password);
      }
      onSuccess?.();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Authentication failed";
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await loginWithGoogle();
      onSuccess?.();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Google login failed";
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      onError?.("Please enter your email address first");
      return;
    }

    try {
      await resetPassword(email);
      onSuccess?.();
      alert("Password reset email sent!");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Password reset failed";
      onError?.(errorMessage);
    }
  };

  return (
    <div style={{
      maxWidth: "400px",
      margin: "0 auto",
      padding: "20px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      backgroundColor: "#fff"
    }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        {isSignUp ? "Sign Up" : "Sign In"}
      </h2>

      <form onSubmit={handleSubmit}>
        {isSignUp && (
          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="displayName" style={{ display: "block", marginBottom: "5px" }}>
              Display Name (optional)
            </label>
            <input
              type="text"
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "16px"
              }}
            />
          </div>
        )}

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="email" style={{ display: "block", marginBottom: "5px" }}>
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "16px"
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="password" style={{ display: "block", marginBottom: "5px" }}>
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "16px"
            }}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontSize: "16px",
            cursor: isLoading ? "not-allowed" : "pointer",
            marginBottom: "10px"
          }}
        >
          {isLoading ? "Loading..." : (isSignUp ? "Sign Up" : "Sign In")}
        </button>
      </form>

      <button
        onClick={handleGoogleLogin}
        disabled={isLoading}
        style={{
          width: "100%",
          padding: "12px",
          backgroundColor: "#db4437",
          color: "white",
          border: "none",
          borderRadius: "4px",
          fontSize: "16px",
          cursor: isLoading ? "not-allowed" : "pointer",
          marginBottom: "10px"
        }}
      >
        Sign in with Google
      </button>

      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        <button
          type="button"
          onClick={() => setIsSignUp(!isSignUp)}
          style={{
            background: "none",
            border: "none",
            color: "#007bff",
            textDecoration: "underline",
            cursor: "pointer",
            fontSize: "14px"
          }}
        >
          {isSignUp ? "Already have an account? Sign In" : "Need an account? Sign Up"}
        </button>
      </div>

      {!isSignUp && (
        <div style={{ textAlign: "center" }}>
          <button
            type="button"
            onClick={handlePasswordReset}
            style={{
              background: "none",
              border: "none",
              color: "#007bff",
              textDecoration: "underline",
              cursor: "pointer",
              fontSize: "14px"
            }}
          >
            Forgot Password?
          </button>
        </div>
      )}
    </div>
  );
};
