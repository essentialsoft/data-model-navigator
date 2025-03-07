import React, { FC, createContext, useContext, useEffect, useState } from "react";
import { fetchManifest } from "../../utils";

type LoadingState = {
  status: Status.LOADING;
  DataCommon: null;
  error: null;
};

type LoadedState = {
  status: Status.LOADED;
  DataCommon: DataCommon;
  error: null;
};

type ErrorState = {
  status: Status.ERROR;
  DataCommon: null;
  error: Error;
};

export type ContextState = LoadingState | LoadedState | ErrorState;

export enum Status {
  LOADING = "LOADING",
  LOADED = "LOADED",
  ERROR = "ERROR",
}

const initialState: ContextState = {
  status: Status.LOADING,
  DataCommon: null,
  error: null,
};

/**
 * Data Common Context Provider
 *
 * NOTE: Do NOT use this context directly. Use the useDataCommonContext hook instead.
 *       this is exported for testing purposes only.
 *
 * @see ContextState
 * @see useDataCommonContext
 */
export const Context = createContext<ContextState>(null);
Context.displayName = "DataCommonContext";

/**
 * Data Common Context Hook
 *
 * Note:
 * - This fetches the manifest for the data common assets and caches it in the session
 * - If it fails to fetch the manifest, it will throw an error
 * - It will provide the DataCommon information, configuration, and model assets
 *
 * @see DataCommonProvider
 * @see ContextState
 * @returns {ContextState} - DataCommon context
 */
export const useDataCommonContext = (): ContextState => {
  const context = useContext<ContextState>(Context);

  if (!context) {
    throw new Error(
      "useDataCommonContext cannot be used outside of the DataCommonProvider component"
    );
  }

  return context;
};

type ProviderProps = {
  DataCommon: DataCommon["name"];
  children: React.ReactNode;
};

/**
 * Creates a Data Common context provider
 *
 * @see useDataCommonContext
 * @param {ProviderProps} props
 * @returns {JSX.Element} Context provider
 */
export const DataCommonProvider: FC<ProviderProps> = ({ DataCommon, children }: ProviderProps) => {
  const [state, setState] = useState<ContextState>(initialState);

  useEffect(() => {
    if (!DataCommon) {
      setState({
        status: Status.ERROR,
        DataCommon: null,
        error: new Error("The provided Data Common is not supported"),
      });
      return;
    }

    setState(initialState);

    (async () => {
      const manifest = await fetchManifest(DataCommon).catch(() => null);
      if (!manifest) {
        setState({
          status: Status.ERROR,
          DataCommon: null,
          error: new Error(`Unable to fetch manifest for ${DataCommon}`),
        });
        return;
      }
      manifest["path"] = DataCommon;
      setState({
        status: Status.LOADED,
        DataCommon: {
          ...manifest["ui_settings"],
          assets: { ...manifest },
        },
        error: null,
      });
    })();
  }, [DataCommon]);

  return <Context.Provider value={state}>{children}</Context.Provider>;
};
