import { createContext, useContext, useEffect, useState } from "react";
import { SignInContext } from "./SignInContext";
import { AppError } from "../components/AppError/AppError";
import { getDatabase, ref, get, child } from "firebase/database";
import { IUser } from "../types/IUser";
import { NotLoggedIn } from "../components/NotLoggedIn/NotLoggedIn";

interface UserContextValue {
  canViewMarkers: boolean;
  canEditMarkers: boolean;
  user: IUser;
  users: Record<string, IUser>;
  loading: boolean;
}

type IUserInfo = Exclude<IUser, "uid">;

export const UserContext = createContext<UserContextValue>(
  {} as UserContextValue
);

export const UserProvider: React.FC = ({ children }) => {
  const { googleAccount } = useContext(SignInContext);
  const [user, setUser] = useState<IUser | null>(null);
  const [users, setUsers] = useState<Record<string, IUserInfo> | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState<Error | null>(null);

  useEffect(() => {
    setUser(null);
    setLoadError(null);

    if (!googleAccount) return;

    setLoading(true);

    get(child(ref(getDatabase()), "/users"))
      .then((snapshot) => {
        const result = snapshot.val() as Record<string, IUserInfo>;
        setUsers(result);
        setUser({
          ...result[googleAccount.uid],
          uid: googleAccount.uid,
        });
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        setLoadError(e);
        console.error(e);
      });
  }, [googleAccount, setLoadError, setLoading, setUser]);

  if (loading) {
    return <AppError error="Loading" />;
  }

  if (!googleAccount) {
    return <NotLoggedIn />;
  }

  if (loadError) {
    return <AppError error="Error signing in" />;
  }

  if (!users || !user?.role || !["player", "dm"].includes(user.role)) {
    return <AppError error="You are not allowed to be here" />;
  }

  const canViewMarkers = ["player", "dm"].includes(user.role);
  const canEditMarkers = user.role === "dm";

  return (
    <UserContext.Provider
      value={{ canViewMarkers, canEditMarkers, loading, user, users }}
    >
      {children}
    </UserContext.Provider>
  );
};
