import { lazy } from "react";
import { RouteObject, useLocation } from "react-router-dom";
import Layout from "./layouts";
import withTracking from "./components/Hocs/withTracking";
import LazyLoader from "./components/LazyLoader";

// Layouts
const MainLayout = withTracking(Layout);

// Extract query parameters in a custom hook
const useQueryConfig = (defaultConfig: string): string => {
  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();
  return query.get("config") || defaultConfig;
};

// Pages
const DMN = LazyLoader(lazy(() => import("./content/modelNavigator/Controller")));

const DMNWrapper: React.FC = () => {
  const defaultConfig =
    "https://raw.githubusercontent.com/essentialsoft/mock-mdf-model/refs/heads/mock-test/7.1.9/";
  const config = useQueryConfig(defaultConfig);

  return <DMN config={config} />;
};

const Status404 = LazyLoader(lazy(() => import("./content/status/Page404")));

const routes: RouteObject[] = [
  {
    path: "",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <DMNWrapper />,
      },
      {
        path: "*",
        element: <Status404 />,
      },
    ],
  },
];

export default routes;
