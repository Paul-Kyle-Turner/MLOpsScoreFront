import { Link } from "react-router-dom";

interface LinkToSignInProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const LinkToSignIn = ({
  className,
  style,
  children = "Sign In",
}: LinkToSignInProps) => {
  const defaultStyle: React.CSSProperties = {
    padding: "12px 24px",
    backgroundColor: "#703fa1ff",
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
      to="/signin"
      style={defaultStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "#e9ecef";
        e.currentTarget.style.color = "#495057";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "#703fa1ff";
        e.currentTarget.style.color = "white";
      }}
      className={className}
    >
      {children}
    </Link>
  );
};

export default LinkToSignIn;
