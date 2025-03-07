import React from "react";
import { useLocation } from "react-router-dom";
import NavigatorView from "./NavigatorView";
import ErrorBoundary from "../../components/ErrorBoundary";
import { DataCommonProvider } from "../../components/Contexts/DataCommonContext";
import usePageTitle from "../../hooks/usePageTitle";

const ModelNavigatorController: React.FC = () => {
  usePageTitle("Model Navigator");

  // Custom hook to parse query parameters
  const useQuery = () => new URLSearchParams(useLocation().search);

  const query = useQuery();
  const defaultConfig =
    "https://raw.githubusercontent.com/jonkiky/crdc-data-model-navigator/refs/heads/data/ctdc/";
  let config = query.get("config") || defaultConfig; // Fallback to defaultConfig if `config` is not present

  // Ensure config has a trailing backslash
  if (!config.endsWith("/")) {
    config += "/";
  }

  return (
    <DataCommonProvider key={config} DataCommon={config}>
      <ErrorBoundary errorMessage="Unable to load the Model Navigator for the requested model">
        <NavigatorView />
      </ErrorBoundary>
    </DataCommonProvider>
  );
};

export default ModelNavigatorController;
