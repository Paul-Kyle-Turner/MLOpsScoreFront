import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "../pages/Root";
import { Dashboard } from "../pages/Dashboard";
import { CreatePlatform } from "../pages/CreatePlatform";
import { Evaluation } from "../pages/Evaluation";
import PlatformsSearch from "../pages/PlatformsSearch";
import Platform from "../pages/Platform";
import NoMatch from "../pages/NoMatch";

import { useSlackAuth } from "../hooks/useSlackAuth";

const AppRouter = () => {
  const { authState } = useSlackAuth();
  const baseRouter = [
    {
      path: "/",
      element: <Root />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },

    {
      path: "/platforms/search/:query",
      element: <PlatformsSearch />,
    },
    {
      path: "/platform/:platformName",
      element: <Platform />,
    },
    {
      path: "*",
      element: <NoMatch />,
    },
  ];

  const authenticatedRouter = [
    {
      path: "/evaluation",
      element: <Evaluation />,
    },
    {
      path: "/create/platform",
      element: <CreatePlatform />,
    },
  ];

  if (!authState?.ok) {
    return <RouterProvider router={createBrowserRouter(baseRouter)} />;
  } else {
    const allRoutes = [...authenticatedRouter, ...baseRouter];
    return <RouterProvider router={createBrowserRouter(allRoutes)} />;
  }
};

export default AppRouter;
