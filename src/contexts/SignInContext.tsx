import { createContext, useCallback, useEffect, useState } from "react";
import { FirebaseApp, initializeApp } from "firebase/app";
import {
  User as FirebaseUser,
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from "firebase/auth";
import { authConfig } from "../config/authConfig";

interface SignInContextValue {
  signIn: () => void;
  signOut: () => void;
  googleAccount: FirebaseUser | null; // TODO at some point we should only render if there is a user, and guarantee this type
}

export const SignInContext = createContext<SignInContextValue>(
  {} as SignInContextValue
);

export function SignInProvider({ children }: React.PropsWithChildren<{}>) {
  const [googleAccount, setGoogleAccount] = useState<FirebaseUser | null>(null);
  const [app, setApp] = useState<FirebaseApp | null>(null);

  useEffect(() => {
    const app = initializeApp(authConfig);
    setApp(app);

    const auth = getAuth(app);
    onAuthStateChanged(auth, (googleAccount) => {
      setGoogleAccount(googleAccount);
    });
  }, []);

  const signIn = useCallback(() => {
    const auth = getAuth();
    const googleAuthProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleAuthProvider);
  }, []);

  const signOut = useCallback(async () => {
    const auth = getAuth();
    await firebaseSignOut(auth);
    window.location.reload();
  }, []);

  if (!app) return null;

  return (
    <SignInContext.Provider
      value={{
        signIn,
        signOut,
        googleAccount,
      }}
    >
      {children}
    </SignInContext.Provider>
  );
}
