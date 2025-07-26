import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import type { Theme } from "../../contexts/theme-context";

const DontSeeYourPlatform: React.FC = () => {
  const { theme } = useTheme();

  const getButtonClasses = (currentTheme: Theme) => {
    const baseClasses =
      "inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

    const themeClasses =
      currentTheme === "dark"
        ? "text-white bg-blue-600 border-blue-600 hover:bg-blue-700 hover:border-blue-700 focus:ring-blue-500 focus:ring-offset-gray-800"
        : "text-blue-600 bg-white border-blue-600 hover:bg-blue-50 hover:text-blue-700 focus:ring-blue-500 focus:ring-offset-white";

    return `${baseClasses} ${themeClasses}`;
  };

  return (
    <Link to="/create/platform" className={getButtonClasses(theme)}>
      Don't see your platform?
    </Link>
  );
};

export default DontSeeYourPlatform;
