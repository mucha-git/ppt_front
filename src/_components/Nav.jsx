import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { Role } from "@/_helpers";
import { accountService, alertService } from "@/_services";
import { AppContext } from "../_helpers/context";
import { IoClose, IoMenu } from "react-icons/io5";
import config from "config";
import "./NavbarMobile.css";

function Nav() {
  const { resetContext } = useContext(AppContext);
  const [user, setUser] = useState({});

  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMobileMenu = () => {
    if (window.innerWidth <= 1150) {
      setShowMenu(false);
    }
  };

  const renderNavLinks = () => {
    const linkClassName = "nav__link";
    return (
      <ul className="nav__list">
        {user.role != Role.Admin && (
          <li className="nav__item">
            <NavLink 
              exact to="/views" 
              className={linkClassName} 
              onClick={closeMobileMenu}
            >
              Widoki
            </NavLink>
          </li>
        )}
        {user.role != Role.Admin && (
          <li className="nav__item">
            <NavLink 
              exact to="/maps" 
              className={linkClassName}
              onClick={closeMobileMenu}
            >
              Mapy
            </NavLink>
          </li>
        )}
        {user.role != Role.Admin && (
          <li className="nav__item">
            <NavLink 
              exact to="/mapPins" 
              className={linkClassName} 
              onClick={closeMobileMenu}
            >
              Pinezki Map
            </NavLink>
          </li>
        )}
        
        {user.role === Role.Manager && (
          <li className="nav__item">
            <NavLink 
              to="/events" 
              className={linkClassName} 
              onClick={closeMobileMenu}
            >
              Wydarzenia
            </NavLink>
          </li>
        )}
        {(user.role === Role.Manager || user.role === Role.User) &&
          user.oneSignalAppId != null &&
          user.oneSignalApiKey != null && (
            <li className="nav__item">
              <NavLink
                to="/notifications"
                className={linkClassName}
                onClick={closeMobileMenu}
              >
                Powiadomienia
              </NavLink>
            </li>
          )}
          <li className="nav__item">
          <NavLink 
            to="/profile" 
            className={linkClassName} 
            onClick={closeMobileMenu}
          >
            Konto
          </NavLink>
        </li>
        {/* {(user.role === Role.Admin || user.role === Role.Manager) && (
          <li>
            <NavLink 
              to="/admin" 
              className={linkClassName} 
              onClick={closeMobileMenu}
            >
              Panel Administracyjny
            </NavLink>
          </li>
        )} */}
        {(user.role === Role.Admin || user.role === Role.Manager) && (
          <li className="nav__item">
            <NavLink to={`/admin/users`} 
              className={linkClassName} 
              onClick={closeMobileMenu}
            >
              Użytkownicy
            </NavLink>
          </li>
        )}
        {(user.role === Role.Admin) && (
          <li className="nav__item">
            <NavLink 
              to="/applications" 
              className={linkClassName} 
              onClick={closeMobileMenu}
            >
              Aplikacje
            </NavLink>
          </li>
        )}
        <li className="nav__item">
          <a onClick={logout} className={linkClassName}>
            Wyloguj
          </a>
        </li>
      </ul>
    );
  };

  useEffect(() => {
    const subscription = accountService.user.subscribe((x) => setUser(x));
    return subscription.unsubscribe;
  }, []);

  function logout() {
    setTimeout(() => logout2(), 1);
  }

  function logout2() {
    closeMobileMenu();
    alertService.clear();
    accountService.logout();
    resetContext();
  }

  // only show nav when logged in
  if (!user) return null;

  return (
    <header className="header d-flex p-2 bg-primary text-white">
      <nav className="nav">
          <div
            className={`nav__menu  ${showMenu ? "show-menu" : ""}`}
            id="nav-menu"
          >
            {renderNavLinks()}
            <div className="nav__close" id="nav-close" onClick={toggleMenu}>
              <IoClose />
            </div>
          </div>
          <div className="nav__toggle" id="nav-toggle" onClick={toggleMenu}>
          <IoMenu />
        </div>
      </nav>
      
      <div className="ml-auto pr-2" style={{ fontSize: "small" }}>
        v. 1.{config.version}
      </div>
    </header>
  );
}

export { Nav };
