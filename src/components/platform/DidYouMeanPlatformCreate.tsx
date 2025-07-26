import React from "react";
import { useNavigate } from "react-router-dom";
import type { PlatformInformation } from "../../model/platform";

interface DidYouMeanPlatformCreateProps {
  platforms: PlatformInformation[];
  searchedName: string;
  onDismiss: () => void;
}

export const DidYouMeanPlatformCreate: React.FC<DidYouMeanPlatformCreateProps> = ({
  platforms,
  searchedName,
  onDismiss,
}) => {
  const navigate = useNavigate();

  const handlePlatformClick = (platformName: string) => {
    // Navigate to the platform details page
    navigate(`/platform/${encodeURIComponent(platformName)}`);
  };

  if (!platforms || platforms.length === 0) {
    return null;
  }

  return (
    <div
      style={{
        backgroundColor: "#fff3cd",
        border: "1px solid #ffeaa7",
        borderRadius: "8px",
        padding: "16px",
        marginTop: "10px",
        marginBottom: "15px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "12px",
        }}
      >
        <div>
          <h4
            style={{
              margin: "0 0 8px 0",
              color: "#856404",
              fontSize: "16px",
              fontWeight: "600",
            }}
          >
            Did you mean one of these platforms?
          </h4>
          <p
            style={{
              margin: "0",
              color: "#856404",
              fontSize: "14px",
            }}
          >
            We found {platforms.length} similar platform
            {platforms.length > 1 ? "s" : ""} to "{searchedName}":
          </p>
        </div>
        <button
          onClick={onDismiss}
          style={{
            background: "none",
            border: "none",
            fontSize: "20px",
            color: "#856404",
            cursor: "pointer",
            padding: "0",
            lineHeight: "1",
          }}
          title="Dismiss"
        >
          ×
        </button>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        {platforms.slice(0, 3).map((platform, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px",
              backgroundColor: "#ffffff",
              border: "1px solid #e9ecef",
              borderRadius: "6px",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onClick={() => handlePlatformClick(platform.platformName)}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#f8f9fa";
              e.currentTarget.style.borderColor = "#dee2e6";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#ffffff";
              e.currentTarget.style.borderColor = "#e9ecef";
            }}
          >
            <div>
              <div
                style={{
                  fontWeight: "600",
                  color: "#495057",
                  marginBottom: "4px",
                }}
              >
                {platform.platformName}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "#6c757d",
                  display: "flex",
                  gap: "12px",
                }}
              >
                <span>Type: {platform.platformType}</span>
                {platform.parentCompany && (
                  <span>Company: {platform.parentCompany}</span>
                )}
                {platform.headquarters && (
                  <span>HQ: {platform.headquarters}</span>
                )}
              </div>
            </div>
            <div
              style={{
                fontSize: "12px",
                color: "#007bff",
                fontWeight: "500",
              }}
            >
              View Details →
            </div>
          </div>
        ))}

        {platforms.length > 3 && (
          <div
            style={{
              textAlign: "center",
              padding: "8px",
              color: "#6c757d",
              fontSize: "14px",
            }}
          >
            and {platforms.length - 3} more platform
            {platforms.length - 3 > 1 ? "s" : ""}...
          </div>
        )}
      </div>

      <div
        style={{
          marginTop: "12px",
          padding: "8px 12px",
          backgroundColor: "#f8f9fa",
          borderRadius: "4px",
          fontSize: "12px",
          color: "#6c757d",
        }}
      >
        💡 If none of these match what you're looking for, you can continue
        creating a new platform entry.
      </div>
    </div>
  );
};
