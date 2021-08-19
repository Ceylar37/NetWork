import React from 'react';
import {Route, Switch} from "react-router-dom";
import s from './Content.module.scss'
import ProfileContainer from "./Profile/ProfileContainer";
import Login from "./Login/Login";
import Users from "./Users/Users";

const Content = () => {
    return (
        <div className={s.contentWrapper}>
            <Switch>
                <Route path={'/profile/:userId?'}>
                    <ProfileContainer/>
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