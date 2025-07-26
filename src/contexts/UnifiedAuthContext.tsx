import React, { createContext, useEffect, useState, useCallback } from "react";
import {
  type User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { useSlackAuthenticated } from "../api/login";
import type { SlackAuthenticationResponse } from "../api/login";

/**
 * Unified Authentication Context
 *
 * This context combines both Firebase and Slack authentication into a single context
 * to simplify the authentication architecture while maintaining both authentication systems.
 *
 * Usage:
 * - Use `useUnifiedAuth()` to access both auth systems
 * - Use `useFirebaseAuth()` for Firebase-specific auth (backward compatible)
 * - Use `useSlackAuth()` for Slack-specific auth (backward compatible)
 *
 * Migration from separate contexts:
 * - Replace FirebaseAuthProvider + SlackAuthProvider with UnifiedAuthProvider
 * - Existing useFirebaseAuth() and useSlackAuth() hooks remain compatible
 */

// Firebase auth interface
export interface FirebaseAuth {
  currentUser: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    displayName?: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithGitHub: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

// Slack auth interface
export interface SlackAuth {
  authState: SlackAuthenticationResponse | null;
  isLoading: boolean;
  error: string | null;
  refetchAuth: () => Promise<void>;
}

// Unified auth context type
export interface UnifiedAuthContextType {
  firebase: FirebaseAuth;
  slack: SlackAuth;
  auth: boolean;
}

// eslint-disable-next-line react-refresh/only-export-components
export const UnifiedAuthContext = createContext<
  UnifiedAuthContextType | undefined
>(undefined);

interface UnifiedAuthProviderProps {
  children: React.ReactNode;
}

export const UnifiedAuthProvider: React.FC<UnifiedAuthProviderProps> = ({
  children,
}) => {
  // Firebase state
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [firebaseIsLoading, setFirebaseIsLoading] = useState(true);

  // Slack state
  const [slackAuthState, setSlackAuthState] =
    useState<SlackAuthenticationResponse | null>(null);
  const [slackIsLoading, setSlackIsLoading] = useState(true);
  const [slackError, setSlackError] = useState<string | null>(null);

  const slackAuthenticated = useSlackAuthenticated();

  // Firebase auth effect
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setFirebaseIsLoading(false);
    });

    return unsubscribe;
  }, []);

  // Firebase auth methods
  const login = async (email: string, password: string): Promise<void> => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const register = async (
    email: string,
    password: string,
    displayName?: string
  ): Promise<void> => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName && result.user) {
      await updateProfile(result.user, { displayName });
    }
  };

  const logout = async (): Promise<void> => {
    await signOut(auth);
  };

  const loginWithGoogle = async (): Promise<void> => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const loginWithGitHub = async (): Promise<void> => {
    const provider = new GithubAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const resetPassword = async (email: string): Promise<void> => {
    await sendPasswordResetEmail(auth, email);
  };

  // Slack auth methods
  const checkSlackAuthentication = useCallback(async () => {
    try {
      setSlackIsLoading(true);
      setSlackError(null);
      const response = await slackAuthenticated();
      setSlackAuthState(response);
    } catch (err) {
      setSlackError(
        err instanceof Error ? err.message : "Failed to check authentication"
      );
      console.error("Slack authentication check failed:", err);
    } finally {
      setSlackIsLoading(false);
    }
  }, [slackAuthenticated]);

  // Check Slack authentication on app start
  useEffect(() => {
    checkSlackAuthentication();
  }, [checkSlackAuthentication]);

  const refetchSlackAuth = async () => {
    await checkSlackAuthentication();
  };

  // Create the unified context value
  const value: UnifiedAuthContextType = {
    firebase: {
      currentUser,
      isLoading: firebaseIsLoading,
      login,
      register,
      logout,
      loginWithGoogle,
      loginWithGitHub,
      resetPassword,
    },
    slack: {
      authState: slackAuthState,
      isLoading: slackIsLoading,
      error: slackError,
      refetchAuth: refetchSlackAuth,
    },
    auth: !!(currentUser || slackAuthState?.ok),
  };

  return (
    <UnifiedAuthContext.Provider value={value}>
      {children}
    </UnifiedAuthContext.Provider>
  );
};
