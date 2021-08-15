import {authActions, authInitialState} from "../store/reducers/authReducer";
import {PropertiesType, ThunkResultT} from "./GlobalTypes";

export enum AuthActionsType {
    SET_USER_DATA = 'auth/SET-USER-DATA',
    SET_CAPTCHA_URL = 'SET_CAPTCHA_URL'
}

export type AuthStateT = typeof authInitialState

type SetUserDataPayloadT = {
    id: number | null,
    email: string | null,
    login: string | null,
    isAuthorised: boolean
}

export type AuthActionT = ReturnType<PropertiesType<typeof authActions>>

export type AuthThunkResultT<R> = ThunkResultT<R, AuthActionT>