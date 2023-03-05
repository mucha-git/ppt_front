import React, { useState, useEffect, useContext } from "react";
import { NavLink, Route } from 'react-router-dom';
import { Role } from '@/_helpers';
import { accountService, alertService  } from '@/_services';
import { AppContext } from "../_helpers/context";

function Nav() {
    const { resetContext } = useContext(AppContext);
    const [user, setUser] = useState({});

    useEffect(() => {
        const subscription = accountService.user.subscribe(x => setUser(x));
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
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <div className="navbar-nav w-75">
                    <NavLink exact to="/" className="nav-item nav-link">Home</NavLink>
                    {user.role != Role.Admin &&
                        <NavLink exact to="/views" className="nav-item nav-link">Views</NavLink>
                    }
                    {user.role != Role.Admin &&
                        <NavLink exact to="/maps" className="nav-item nav-link">Maps</NavLink>
                    }
                    {user.role != Role.Admin &&
                        <NavLink exact to="/mapPins" className="nav-item nav-link">MapPins</NavLink>
                    }
                    <NavLink to="/profile" className="nav-item nav-link">Profile</NavLink>
                    {(user.role === Role.Admin || user.role === Role.Manager) &&
                        <NavLink to="/admin" className="nav-item nav-link">Admin</NavLink>
                    }
                    {user.role === Role.Admin &&
                        <NavLink to="/pilgrimages" className="nav-item nav-link">Pielgrzymki</NavLink>
                    }
                    <a onClick={logout} className="nav-item nav-link">Logout</a>
                
                    
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
                <NavLink to={`${path}/users`} className="nav-item nav-link">Users</NavLink>
            </div>
        </nav>
    );
}

export { Nav }; 