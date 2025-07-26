import { useContext } from "react";
import { FirebaseAuthContext } from "../contexts/FirebaseAuthContext";
import type { FirebaseAuthContextType } from "../contexts/FirebaseAuthContext";

export const useFirebaseAuth = (): FirebaseAuthContextType => {
  const context = useContext(FirebaseAuthContext);
  if (context === undefined) {
    throw new Error("useFirebaseAuth must be used within a FirebaseAuthProvider");
  }
  return context;
};
