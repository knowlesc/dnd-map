import React, { useContext } from "react";
import { SignInContext } from "../../contexts/SignInContext";
import { AppHeader } from "../AppHeader/AppHeader";
import { NotLoggedIn } from "../NotLoggedIn/NotLoggedIn";
import { MapLinkList } from "../MapLinkList/MapLinkList";

export function LandingPage() {
  const { googleAccount } = useContext(SignInContext);
  if (!googleAccount)
    return (
      <>
        <AppHeader />
        <NotLoggedIn />
      </>
    );

  return (
    <>
      <AppHeader />
      <main className="app-body bg-table-wood pt-10 bg-cover">
        <MapLinkList />
      </main>
    </>
  );
}
