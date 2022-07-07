import "./LandingPage.scss";
import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { SignInContext } from "../../contexts/SignInContext";
import { mapConfig } from "../../config/mapConfig";
import AppHeader from "../AppHeader/AppHeader";
import NotLoggedIn from "../NotLoggedIn/NotLoggedIn";

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
        <div className="map-link-list">
          <div></div>
          <div>
            {mapConfig.map(({ mapName, displayName }) => (
              <Link key={mapName} to={`/${mapName}`} className="map-link">
                <FontAwesomeIcon icon="map" /> {displayName}
              </Link>
            ))}
          </div>
          <div></div>
        </div>
      </main>
    </>
  );
};

export default LandingPage;
