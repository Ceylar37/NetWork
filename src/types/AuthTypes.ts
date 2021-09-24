import {PropertiesType, ThunkResultT} from "./GlobalTypes";
import {authActions, authInitialState} from "../store/slice-reducers/authReducer";

export type AuthStateT = typeof authInitialState

export type AuthActionT = ReturnType<PropertiesType<typeof authActions>>

export type AuthThunkResultT<R> = ThunkResultT<R, AuthActionT>

