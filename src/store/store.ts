import {combineReducers} from "redux"
import {appReducer} from "./slice-reducers/appReducer";
import {configureStore} from '@reduxjs/toolkit';
import {authReducer} from "./slice-reducers/authReducer";
import {chatReducer} from "./slice-reducers/chatReducer";
import {profileReducer} from "./slice-reducers/profileReducer";
import {usersReducer} from "./slice-reducers/usersReducer";

export const rootReducer = combineReducers({
    profilePage: profileReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    chatPage: chatReducer
})


export const store = configureStore({
    reducer: rootReducer,
});

// @ts-ignore
window.store = store

// @ts-ignore
window.state = store.getState