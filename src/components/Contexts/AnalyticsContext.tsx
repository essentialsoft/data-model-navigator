import React, { FC, createContext, useContext, useMemo } from "react";
import ReactGA from "react-ga4";
import env from "../../env";

export type ContextState = {
  ReactGA: typeof ReactGA;
};

/**
 * Auth Context
 *
 * NOTE: Do NOT use this context directly. Use the useAnalytics hook instead.
 *       this is exported for testing purposes only.
 *
 * @see ContextState
 * @see useAnalytics
 */
export const Context = createContext<ContextState>(null);
Context.displayName = "AnalyticsContext";

/**
 * Auth Context Hook
 *
 * @see AnalyticsProvider – Must be wrapped in a AnalyticsProvider component
 * @see ContextState – Context state returned by the hook
 * @returns {ContextState} - Context
 */
export const useAnalytics = (): ContextState => {
  const context = useContext<ContextState>(Context);

  if (!context) {
    throw new Error("AnalyticsContext cannot be used outside of the AnalyticsProvider component");
  }

  return context;
};

type ProviderProps = {
  GA_MEASUREMENT_ID: string;
  children: React.ReactNode;
};

/**
 * Creates a Google Analytics context
 *
 * @see useAnalyticsContext – Context hook
 * @param {ProviderProps} props
 * @returns {JSX.Element}
 */
export const AnalyticsProvider: FC<ProviderProps> = ({
  GA_MEASUREMENT_ID,
  children,
}: ProviderProps) => {
  const value: ContextState = useMemo(() => {
    if (ReactGA.isInitialized) {
      ReactGA.reset();
    }
    if (GA_MEASUREMENT_ID) {
      ReactGA.initialize(GA_MEASUREMENT_ID, {
        gaOptions: {
          DEV_TIER: env?.REACT_APP_DEV_TIER || "N/A",
          FE_VERSION: env?.REACT_APP_FE_VERSION || "N/A",
        },
      });
    }

    return { ReactGA };
  }, [GA_MEASUREMENT_ID]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
