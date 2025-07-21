import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface BasePageProps {
  children: React.ReactNode;
  title?: string;
}

const BasePage: React.FC<BasePageProps> = ({
  children,
  title = "MLOps Platform Scores",
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  const isDashboard = location.pathname === "/dashboard";

  return (
    <div>
      <header>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {!isDashboard && (
            <button onClick={handleBackToDashboard}>Back to Dashboard</button>
          )}
          <div style={{ flex: 1, textAlign: 'center' }}>
            <h1>{title}</h1>
          </div>
          {/* Empty div for spacing when button is present */}
          <div style={{ width: !isDashboard ? 'auto' : '0' }}></div>
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
};

export default BasePage;
