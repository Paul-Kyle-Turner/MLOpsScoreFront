import React from "react";
import { useFirebaseAuth } from "../../hooks/useFirebaseAuth";

export const FirebaseUserProfile: React.FC = () => {
  const { currentUser, logout, isLoading } = useFirebaseAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    return null;
  }

  return (
    <div style={{
      padding: "15px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      backgroundColor: "#f9f9f9",
      maxWidth: "300px",
      margin: "0 auto"
    }}>
      <div style={{ marginBottom: "15px", textAlign: "center" }}>
        {currentUser.photoURL && (
          <img
            src={currentUser.photoURL}
            alt="Profile"
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              marginBottom: "10px"
            }}
          />
        )}
        <h3 style={{ margin: "0 0 5px 0", fontSize: "18px" }}>
          {currentUser.displayName || "User"}
        </h3>
        <p style={{ margin: "0", color: "#666", fontSize: "14px" }}>
          {currentUser.email}
        </p>
      </div>

      <button
        onClick={handleLogout}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#dc3545",
          color: "white",
          border: "none",
          borderRadius: "4px",
          fontSize: "14px",
          cursor: "pointer"
        }}
      >
        Sign Out
      </button>
    </div>
  );
};
