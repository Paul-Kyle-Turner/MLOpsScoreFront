import { Link } from "react-router-dom";

interface LinkToDashboardProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const LinkToDashboard = ({
  className,
  style,
  children = "Go to Dashboard",
}: LinkToDashboardProps) => {
  const defaultStyle: React.CSSProperties = {
    padding: "12px 24px",
    backgroundColor: "#667eea",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "500",
    textDecoration: "none",
    display: "inline-block",
    transition: "background-color 0.2s ease",

    ...style,
  };

  return (
    <Link
      to="/dashboard"
      style={defaultStyle}
      className={className}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "#e9ecef";
        e.currentTarget.style.color = "#495057";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "#667eea";
        e.currentTarget.style.color = "white";
      }}
    >
      {children}
    </Link>
  );
};

export default LinkToDashboard;
