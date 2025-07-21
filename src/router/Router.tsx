import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "../pages/Root";
import { Dashboard } from "../pages/Dashboard";
import { CreatePlatform } from "../pages/CreatePlatform";
import { Evaluation } from "../pages/Evaluation";
import PlatformsSearch from "../pages/PlatformsSearch";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/evaluation",
    element: <Evaluation />,
  },
  {
    path: "/create/platform",
    element: <CreatePlatform />,
  },
  {
    path: "/platforms/search/:query",
    element: <PlatformsSearch />,
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
