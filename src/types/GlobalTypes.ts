import {store} from "../store/store";
import {ThunkAction} from "redux-thunk";
import {Action} from "redux";

export type Nullable<T> = null | T

export type PropertiesType<T> = T extends {[key: string]: infer U} ? U : never

export type RootStateT = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type ThunkResultT<R, A extends Action> = ThunkAction<R, RootStateT, undefined, A>

export interface IThunkAPI {
    dispatch: AppDispatch
    state: RootStateT
}