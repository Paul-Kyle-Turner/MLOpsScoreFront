import LinkToDashboard from "../components/linkButtons/LinkToDashboard";
import { SearchBoxLinkOut } from "../components/searchBox/SearchBoxLinkOut";
import { FirebaseUserProfile } from "../components/firebaseAuth";
import { UnifiedAuth } from "../components/unifiedAuth";
import { useFirebaseAuth } from "../hooks/useFirebaseAuth";
import { useState } from "react";

const Root = () => {
  const { currentUser, isLoading } = useFirebaseAuth();
  const [authError, setAuthError] = useState<string | null>(null);

  const handleAuthSuccess = () => {
    setAuthError(null);
  };

  const handleAuthError = (error: string) => {
    setAuthError(error);
  };

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
        }}
      >
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

          {/* Authentication Section */}
          <div style={{ marginBottom: "20px", width: "100%" }}>
            {isLoading ? (
              <div>Loading authentication...</div>
            ) : currentUser ? (
              <FirebaseUserProfile />
            ) : (
              <div>
                <UnifiedAuth
                  onSuccess={handleAuthSuccess}
                  onError={handleAuthError}
                />
                {authError && (
                  <div
                    style={{
                      color: "red",
                      marginTop: "10px",
                      padding: "10px",
                      backgroundColor: "#ffe6e6",
                      borderRadius: "4px",
                    }}
                  >
                    {authError}
                  </div>
                )}
              </div>
            )}
          </div>

          <br />
        </div>
      </div>
    </div>
  );
};

export default Root;
