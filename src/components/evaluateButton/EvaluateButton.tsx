import React from "react";
import { Link } from "react-router-dom";
import { Calculator } from "lucide-react";
import type { PlatformInformation } from "../../model/platform";

interface EvaluateButtonProps {
  platform: PlatformInformation;
  variant?: "primary" | "outline-primary" | "success" | "outline-success";
  size?: "sm" | "lg";
  className?: string;
}

export const EvaluateButton: React.FC<EvaluateButtonProps> = ({
  platform,
  variant = "primary",
  size = "sm",
  className = "",
}) => {
  // Create the evaluation URL with platform information as query parameters
  const evaluationUrl = `/evaluation?platform=${encodeURIComponent(
    platform.id || ""
  )}&type=${encodeURIComponent(
    platform.platformType
  )}&name=${encodeURIComponent(platform.platformName)}`;

  return (
    <Link
      to={evaluationUrl}
      className={`btn btn-${variant} ${
        size ? `btn-${size}` : ""
      } ${className} d-flex align-items-center justify-content-center text-decoration-none`}
      style={{ textDecoration: "none" }}
    >
      <Calculator size={14} className="me-1" />
      Evaluate
    </Link>
  );
};
