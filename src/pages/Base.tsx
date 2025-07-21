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
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
            </div>
            {!isDashboard && (
              <button
                onClick={handleBackToDashboard}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                aria-label="Back to dashboard"
              >
                Back to Dashboard
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="border-b border-gray-200"></div>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
};

export default BasePage;
