import { Link } from "react-router";
import { SearchBoxLinkOut } from "../components/searchBox/SearchBoxLinkOut";

export const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center text-center p-5 transition-colors">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        MLOps Platform Score Dashboard
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Welcome! You are now authenticated with Slack.
      </p>

      {/* Search box */}
      <div className="mb-8">
        <SearchBoxLinkOut />
      </div>
      
      <p className="text-base text-gray-600 dark:text-gray-400 mb-6">
        If you have used an MLOps platform before, you can give it a score.
      </p>

      {/* Add your evaluation button */}
      <Link to={"/evaluation"}>
        <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white border-none rounded-lg cursor-pointer text-base font-medium transition-colors">
          Start Evaluation
        </button>
      </Link>
    </div>
  );
};
