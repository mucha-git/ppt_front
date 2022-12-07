import React, { useState, useEffect, useContext } from "react";
import { NavLink, Route } from 'react-router-dom';
import { SignalRContext } from "../_helpers/context";
import { Role } from '@/_helpers';
import { accountService, alertService  } from '@/_services';
import { SignalR } from "../signalR/SignalR";

function Nav() {
    const [user, setUser] = useState({});
    const { resetContext, setCloseSignalRConnection, groupView, setGroupView } = useContext(SignalRContext);

    useEffect(() => {
        const subscription = accountService.user.subscribe(x => setUser(x));
        return subscription.unsubscribe;
    }, []);

    function logout() {
        setCloseSignalRConnection(true);
        setTimeout(() => logout2(), 1);
      }
    
      function logout2() {
        alertService.clear();
        accountService.logout();
        resetContext();
      }

    function setValueForGroupView(){
        groupView ? setGroupView(false) : setGroupView(true)
    }  
    // only show nav when logged in
    if (!user) return null;

    return (
        <div>
            <SignalR />
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <div className="navbar-nav w-75">
                    <NavLink exact to="/" className="nav-item nav-link">Home</NavLink>
                    <NavLink to="/profile" className="nav-item nav-link">Profile</NavLink>
                    {user.role === Role.Admin &&
                        <NavLink to="/admin" className="nav-item nav-link">Admin</NavLink>
                    }
                    <a onClick={logout} className="nav-item nav-link">Logout</a>
                
                    
                </div>
                <div className="navbar-nav">
                    <div className="nav-item nav-link active">
                        <h5>{user.firstName + " " + user.lastName + ", trade acount: " + user.tradeAccountId}</h5>
                    </div>
                    
                </div>
                <button type="button" style={{width:'300px'}} className={"btn btn-outline-light"} onClick={() => setValueForGroupView()}>{groupView?"ZARZĄDZANIE SZCZEGÓŁOWE":"ZARZĄDZANIE ZBIORCZE"}</button>
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