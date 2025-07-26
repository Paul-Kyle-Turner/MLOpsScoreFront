import { useContext } from "react";
import { UnifiedAuthContext } from "../contexts/UnifiedAuthContext";
import type { UnifiedAuthContextType } from "../contexts/UnifiedAuthContext";

/**
 * Hook to access the unified authentication context
 * Provides access to both Firebase and Slack authentication systems
 */
export const useUnifiedAuth = (): UnifiedAuthContextType => {
    const context = useContext(UnifiedAuthContext);
    if (context === undefined) {
        throw new Error("useUnifiedAuth must be used within a UnifiedAuthProvider");
    }
    return context;
};

// Convenience hooks for accessing individual auth systems
// These maintain backward compatibility with existing code

/**
 * Hook to access Firebase authentication
 * Backward compatible with the original useFirebaseAuth hook
 */
export const useFirebaseAuth = () => {
    const { firebase } = useUnifiedAuth();
    return firebase;
};

/**
 * Hook to access Slack authentication
 * Backward compatible with the original useSlackAuth hook
 */
export const useSlackAuth = () => {
    const { slack } = useUnifiedAuth();
    return slack;
};
