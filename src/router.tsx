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
    "https://raw.githubusercontent.com/CBIIT/ctdc-data-model-navigator-landing/refs/heads/main/example/CTDC/1.0.0/";
  // "https://raw.githubusercontent.com/jonkiky/crdc-data-model-navigator/refs/heads/data/ctdc/";
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
        path: "/crdc-data-model-navigator",
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
