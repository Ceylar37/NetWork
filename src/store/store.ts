import {applyMiddleware, combineReducers, createStore} from "redux"
import thunk from "redux-thunk"
import profileReducer from "./reducers/profileReducer"
import usersReducer from "./reducers/usersReducer"
import authReducer from "./reducers/authReducer"
import appReducer from "./reducers/appReducer"
import chatReducer from "./reducers/ChatReducer"

export const rootReducer = combineReducers({
    profilePage: profileReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    chatPage: chatReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))


// @ts-ignore
window.store = store