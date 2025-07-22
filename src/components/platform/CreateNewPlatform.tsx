import React from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

interface CreateNewPlatformProps {
  variant?: "primary" | "outline-primary" | "success" | "outline-success";
  size?: "sm" | "lg";
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export const CreateNewPlatform: React.FC<CreateNewPlatformProps> = ({
  variant = "primary",
  size = "sm",
  className = "",
  children = "Create New Platform",
  style,
}) => {
  const defaultStyle: React.CSSProperties = {
    padding: size === "lg" ? "12px 24px" : "8px 16px",
    backgroundColor: variant.includes("outline") ? "transparent" : "#28a745",
    color: variant.includes("outline") ? "#28a745" : "white",
    border: variant.includes("outline")
      ? "2px solid #28a745"
      : "2px solid #28a745",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: size === "lg" ? "16px" : "14px",
    fontWeight: "500",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    transition: "all 0.2s ease",
    ...style,
  };

  const hoverStyle = variant.includes("outline")
    ? { backgroundColor: "#28a745", color: "white" }
    : { backgroundColor: "#218838" };

  return (
    <Link
      to="/create/platform"
      style={defaultStyle}
      className={className}
      onMouseEnter={(e) => {
        Object.assign(e.currentTarget.style, hoverStyle);
      }}
      onMouseLeave={(e) => {
        Object.assign(e.currentTarget.style, defaultStyle);
      }}
    >
      <Plus size={size === "lg" ? 18 : 14} />
      {children}
    </Link>
  );
};

export default CreateNewPlatform;
