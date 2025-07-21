import { SlackLogin } from "../components/slackLogin/SlackLogin";
import ThemeToggle from "../components/theme/ThemeToggle";

const Root = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center text-center p-5 transition-colors">
      {/* Theme toggle in top right corner */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        Welcome to MLOps Platform Score
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 max-w-2xl">
        A community-driven app for evaluating MLOps platforms.
      </p>

      <p className="text-base text-gray-600 dark:text-gray-400 mb-8 max-w-xl">
        We request that you be a part of our community to contribute and improve
        the platform.
      </p>
      <SlackLogin />
    </div>
  );
};

export default Root;
