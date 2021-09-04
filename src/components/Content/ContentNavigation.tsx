import React from 'react';
import {Route, Switch} from "react-router-dom";
import s from './Content.module.scss'
import Login from "./Login/Login";
import Users from "./Users/Users";
import Profile from "./Profile/Profile";
import Chat from "./Chat/Chat";

const ContentNavigation = () => {
    return (
        <div className={s.contentWrapper}>
            <Switch>
                <Route exact={true} path={'/profile'}>
                    <Profile/>
                </Route>
                <Route path={'/profile/:userId?'}>
                    <Profile/>
                </Route>
                <Route path={'/users'}>
                    <Users/>
                </Route>
                <Route path={'/login'}>
                    <Login/>
                </Route>
                <Route path={'/settings'}>
                    <h1 style={{color: 'white'}}>
                        Settings
                    </h1>
                </Route>
                <Route path={'/chat'}>
                    <Chat/>
                </Route>
            </Switch>
        </div>
    );
};

export default ContentNavigation;