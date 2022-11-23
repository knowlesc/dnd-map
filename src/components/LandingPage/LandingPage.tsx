import { useContext } from "react";
import { SignInContext } from "../../contexts/SignInContext";
import { NotLoggedIn } from "../NotLoggedIn/NotLoggedIn";
import { MapLinkList } from "../MapLinkList/MapLinkList";

export function LandingPage() {
  const { googleAccount } = useContext(SignInContext);
  if (!googleAccount)
    return (
      <>
        <NotLoggedIn />
      </>
    );

  return (
    <>
      <main className="app-body bg-table-wood pt-10 bg-cover">
        <MapLinkList />
      </main>
    </>
  );
}
