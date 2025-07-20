import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "../pages/Root";
import { Dashboard } from "../pages/Dashboard";
import { SlackCallback } from "../components/slackCallback/SlackCallback";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/auth/slack/callback",
    element: <SlackCallback />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
