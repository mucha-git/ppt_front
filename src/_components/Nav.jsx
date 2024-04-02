import React, { useState, useEffect, useContext } from "react";
import { NavLink, Route } from "react-router-dom";
import { Role } from "@/_helpers";
import { accountService, alertService } from "@/_services";
import { AppContext } from "../_helpers/context";
import config from "config";

function Nav() {
  const { resetContext } = useContext(AppContext);
  const [user, setUser] = useState({});

  useEffect(() => {
    const subscription = accountService.user.subscribe((x) => setUser(x));
    return subscription.unsubscribe;
  }, []);

  function logout() {
    setTimeout(() => logout2(), 1);
  }

  function logout2() {
    alertService.clear();
    accountService.logout();
    resetContext();
  }

  // only show nav when logged in
  if (!user) return null;

  return (
    <div>
      <nav className="d-flex p-2 bg-primary text-white">
        {user.role != Role.Admin && (
          <NavLink exact to="/views" className="nav-item nav-link text-white">
            Widoki
          </NavLink>
        )}
        {user.role != Role.Admin && (
          <NavLink exact to="/maps" className="nav-item nav-link text-white">
            Mapy
          </NavLink>
        )}
        {user.role != Role.Admin && (
          <NavLink exact to="/mapPins" className="nav-item nav-link text-white">
            Pinezki Map
          </NavLink>
        )}
        <NavLink to="/profile" className="nav-item nav-link text-white">
          Konto
        </NavLink>
        {(user.role === Role.Admin || user.role === Role.Manager) && (
          <NavLink to="/admin" className="nav-item nav-link text-white">
            Panel Administracyjny
          </NavLink>
        )}
        {(user.role === Role.Admin || user.role === Role.Manager) && (
          <NavLink to="/pilgrimages" className="nav-item nav-link text-white">
            Pielgrzymki
          </NavLink>
        )}
        {user.role === Role.Manager && (
          <NavLink to="/events" className="nav-item nav-link text-white">
            Wydarzenia
          </NavLink>
        )}
        {(user.role === Role.Manager || user.role === Role.User) &&
          user.oneSignalAppId != null &&
          user.oneSignalApiKey != null && (
            <NavLink
              to="/notifications"
              className="nav-item nav-link text-white"
            >
              Powiadomienia
            </NavLink>
          )}
        <a onClick={logout} className="nav-item nav-link">
          Wyloguj
        </a>

        <div className="ml-auto" style={{ fontSize: "small" }}>
          v. 1.{config.version}
        </div>
      </nav>
      <Route path="/admin" component={AdminNav} />
    </div>
  );
}

function AdminNav({ match }) {
  const { path } = match;

  return (
    <nav className="admin-nav navbar navbar-expand navbar-light">
      <div className="navbar-nav">
        <NavLink to={`${path}/users`} className="nav-item nav-link">
          Użytkownicy
        </NavLink>
      </div>
    </nav>
  );
}

export { Nav };
