import React from 'react';
import {Route, Switch} from "react-router-dom";
import s from './Content.module.scss'
import Login from "./Login/Login";
import Users from "./Users/Users";
import Profile from "./Profile/Profile";

const Content = () => {
    return (
        <div className={s.contentWrapper}>
            <Switch>
                <Route path={'/profile/:userId?'}>
                    <Profile/>
                </Route>
                <Route path={'/users'}>
                    <Users/>
                </Route>
                <Route path={'/login'}>
                    <Login/>
                </Route>
            </Switch>
        </div>
    );
};

export default Content;