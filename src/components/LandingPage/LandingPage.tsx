import "./LandingPage.scss";
import React, { useContext } from "react";
import { SignInContext } from "../../contexts/SignInContext";
import AppHeader from "../AppHeader/AppHeader";
import NotLoggedIn from "../NotLoggedIn/NotLoggedIn";
import MapLinkList from "../MapLinkList/MapLinkList";

export const LandingPage: React.FC = () => {
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
      <main className="app-body app-body-background landing-page">
        <MapLinkList />
      </main>
    </>
  );
};

export default LandingPage;
