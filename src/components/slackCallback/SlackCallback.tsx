import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const SlackCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"processing" | "success" | "error">("processing");
  const [message, setMessage] = useState("Processing your authentication...");

  const code = searchParams.get("code");
  const error = searchParams.get("error");

  useEffect(() => {
    if (error) {
      setStatus("error");
      setMessage(`Authentication failed: ${error}`);
      return;
    }

    if (!code) {
      setStatus("error");
      setMessage("No authorization code received");
      return;
    }

    // Here you would typically exchange the code for an access token
    // For now, we'll just simulate the process
    const processAuth = async () => {
      try {
        // TODO: Exchange code for access token with your backend
        console.log("Authorization code:", code);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        setStatus("success");
        setMessage("Authentication successful! Redirecting...");
        
        // Redirect to dashboard or main app after successful auth
        setTimeout(() => {
          navigate("/dashboard"); // You'll need to create this route
        }, 2000);
        
      } catch {
        setStatus("error");
        setMessage("Failed to process authentication");
      }
    };

    processAuth();
  }, [code, error, navigate]);

  const getStatusColor = () => {
    switch (status) {
      case "processing": return "#2eb67d";
      case "success": return "#36c5f0";
      case "error": return "#e01e5a";
      default: return "#000";
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          color: getStatusColor(),
          fontSize: "24px",
          marginBottom: "20px",
        }}
      >
        {status === "processing" && "🔄"}
        {status === "success" && "✅"}
        {status === "error" && "❌"}
      </div>
      
      <h1>{status === "success" ? "Welcome!" : "Processing Authentication"}</h1>
      <p>{message}</p>
      
      {code && (
        <details style={{ marginTop: "20px", fontSize: "12px", color: "#666" }}>
          <summary>Debug Info</summary>
          <p>Authorization code: {code}</p>
        </details>
      )}
      
      {status === "error" && (
        <button
          onClick={() => navigate("/")}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#e01e5a",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Back to Login
        </button>
      )}
    </div>
  );
};
