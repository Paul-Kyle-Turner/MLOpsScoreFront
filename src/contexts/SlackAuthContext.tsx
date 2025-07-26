import React, { createContext, useEffect, useState, useCallback } from "react";
import type { ReactNode } from "react";
import { useSlackAuthenticated } from "../api/login";
import type { SlackAuthenticationResponse } from "../api/login";

export interface SlackAuthContextType {
  authState: SlackAuthenticationResponse | null;
  isLoading: boolean;
  error: string | null;
  refetchAuth: () => Promise<void>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const SlackAuthContext = createContext<SlackAuthContextType | undefined>(
  undefined
);

interface SlackAuthProviderProps {
  children: ReactNode;
}

export const SlackAuthProvider: React.FC<SlackAuthProviderProps> = ({
  children,
}) => {
  const [authState, setAuthState] =
    useState<SlackAuthenticationResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const slackAuthenticated = useSlackAuthenticated();

  const checkAuthentication = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await slackAuthenticated();
      setAuthState(response);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to check authentication"
      );
      console.error("Slack authentication check failed:", err);
    } finally {
      setIsLoading(false);
    }
  }, [slackAuthenticated]);

  // Check authentication on app start
  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

  const refetchAuth = async () => {
    await checkAuthentication();
  };

  const contextValue: SlackAuthContextType = {
    authState,
    isLoading,
    error,
    refetchAuth,
  };

  return (
    <SlackAuthContext.Provider value={contextValue}>
      {children}
    </SlackAuthContext.Provider>
  );
};
