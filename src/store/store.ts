import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import profileReducer from "./reducers/profileReducer";
import usersReducer from "./reducers/usersReducer";
import authReducer from "./reducers/authReducer";
import appReducer from "./reducers/appReducer";

export const rootReducer = combineReducers({
    profilePage: profileReducer,
    //dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk))


// @ts-ignore
window.store = store