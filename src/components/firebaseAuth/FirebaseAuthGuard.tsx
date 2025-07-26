import React from "react";
import { useFirebaseAuth } from "../../hooks/useFirebaseAuth";
import { FirebaseLoginForm } from "./FirebaseLoginForm";

interface FirebaseAuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const FirebaseAuthGuard: React.FC<FirebaseAuthGuardProps> = ({ 
  children, 
  fallback 
}) => {
  const { currentUser, isLoading } = useFirebaseAuth();

  if (isLoading) {
    return (
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        minHeight: "200px" 
      }}>
        Loading...
      </div>
    );
  }

  if (!currentUser) {
    return fallback || (
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        minHeight: "400px",
        flexDirection: "column",
        gap: "20px"
      }}>
        <h2>Authentication Required</h2>
        <p>Please sign in to access this content.</p>
        <FirebaseLoginForm />
      </div>
    );
  }

  return <>{children}</>;
};
