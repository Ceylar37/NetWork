import {PropertiesType, ThunkResultT} from "./GlobalTypes";
import {authActions} from "../store/slice-reducers/authReducer";

export type AuthActionT = ReturnType<PropertiesType<typeof authActions>>

export type AuthThunkResultT<R> = ThunkResultT<R, AuthActionT>

