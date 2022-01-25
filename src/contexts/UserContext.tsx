import { createContext, useContext, useEffect, useState } from "react";
import { SignInContext } from "./SignInContext";
import AppError from "../components/AppError/AppError";
import { getDatabase, ref, get, child } from "firebase/database";

interface UserContextValue {
  canViewMarkers: boolean;
  canEditMarkers: boolean;
  email: string;
  loading: boolean;
}

interface IUser {
  uid: string;
  role: string;
  name: string;
}

export const UserContext = createContext<UserContextValue>(
  {} as UserContextValue
);

export const UserProvider: React.FC = ({ children }) => {
  const { user } = useContext(SignInContext);
  const [role, setRole] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState<Error | null>(null);

  useEffect(() => {
    setRole(null);
    setEmail(user?.email ?? null);
    setLoadError(null);

    if (!user) return;

    setLoading(true);

    get(child(ref(getDatabase()), "/users/" + user.uid))
      .then((snapshot) => {
        const result = snapshot.val() as IUser;
        setRole(result?.role);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        setLoadError(e);
        console.error(e);
      });
  }, [user, setLoadError, setLoading, setEmail, setRole]);

  if (loading) {
    return <AppError error="Loading" />;
  }

  if (!user) {
    return <AppError error="Not signed in" />;
  }

  if (loadError || !email) {
    return <AppError error="Error signing in" />;
  }

  if (!role || !["player", "dm"].includes(role)) {
    return <AppError error="You are not allowed to be here" />;
  }

  const canViewMarkers = ["player", "dm"].includes(role);
  const canEditMarkers = role === "dm";

  return (
    <UserContext.Provider
      value={{ canViewMarkers, canEditMarkers, loading, email }}
    >
      {children}
    </UserContext.Provider>
  );
};
