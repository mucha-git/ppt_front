import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';

import { Role } from '@/_helpers';
import { accountService } from '@/_services';
import { Nav, PrivateRoute, Alert } from '@/_components';
import { Home } from '@/home';
import { Profile } from '@/profile';
import { Admin } from '@/admin';
import { Account } from '@/account';
import { Views } from '@/views';
import { AppContextProvider } from '../_helpers/context';
import "@murasoftware/react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { Elements } from '@/elements';
import { Maps } from '../maps/Index';
import { Applications } from '../applications/Index';
import { Years } from '../years/Index';
import { MapPins } from '../mapPins/Index';
import { Notifications } from '../notifications/Index';

function App() {
    const { pathname } = useLocation();  
    const [user, setUser] = useState({});

    useEffect(() => {
        const subscription = accountService.user.subscribe(x => setUser(x));
        return subscription.unsubscribe;
    }, []);

    return (
        <div className={'app-container' + (user && ' bg-light')}>
            <AppContextProvider>
            <Nav />
            <Alert />
            <Switch>
                <PrivateRoute path="/views" component={Views} />
                <PrivateRoute path="/elements" component={Elements} />
                <PrivateRoute path="/maps" component={Maps} />
                <PrivateRoute path="/mapPins" component={MapPins} />
                <PrivateRoute path="/applications" component={Applications} roles={[Role.Admin]} />
                <PrivateRoute path="/events" component={Years} roles={[Role.Manager]} />
                <PrivateRoute path="/profile" component={Profile} />
                <PrivateRoute path="/notifications" component={Notifications} roles={[Role.Manager, Role.User]} />
                <PrivateRoute path="/admin" roles={[Role.Admin, Role.Manager]} component={Admin} />
                <Route path="/account" component={Account} />
                <Redirect from="/:url*(/+)" to={pathname} />
                <Redirect from="*" to="/views" />
            </Switch>
            </AppContextProvider>
        </div>
    );
}

export { App }; 