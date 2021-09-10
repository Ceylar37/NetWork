import React from "react";
import Login from "../components/Content/Login/Login";
import Profile from "../components/Content/Profile/Profile";
import Users from "../components/Content/Users/Users";
import Chat from "../components/Content/Chat/Chat";
import Settings from "../components/Content/Settings/Settings";


export type RouteT = {
    path: string,
    component: React.ComponentType,
    exact?: boolean
}

export enum RouteNames {
    LOGIN = '/',
    PROFILE = '/',
    PROFILE_ID = '/profile/:userId?',
    USERS = '/users',
    CHAT = '/chat',
    SETTINGS = '/settings'
}

export const publicRoutes: RouteT[] = [
    {path: RouteNames.LOGIN, component: Login}
]

const defaultPrivateRoutes: RouteT[] = [
    {path: RouteNames.PROFILE_ID, component: Profile},
    {path: RouteNames.USERS, component: Users},
    {path: RouteNames.CHAT, component: Chat},
    {path: RouteNames.SETTINGS, component: Settings},

]

export const privateRoutes: RouteT[] = [...defaultPrivateRoutes, {path: RouteNames.PROFILE, exact: true, component: Profile}]

