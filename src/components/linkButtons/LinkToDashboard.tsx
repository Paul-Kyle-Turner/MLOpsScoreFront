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
    backgroundColor: "#007bff",
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
    <Link to="/dashboard" style={defaultStyle} className={className}>
      {children}
    </Link>
  );
};

export default LinkToDashboard;
