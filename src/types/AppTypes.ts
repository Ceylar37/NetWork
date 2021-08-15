import {appActions, appInitialState} from "../store/reducers/appReducer";
import {PropertiesType, ThunkResultT} from "./GlobalTypes";

export enum AppActionsType {
    INITIALIZED_SUCCESS = 'app/INITIALIZED-SUCCESS'
}

export type AppStateT = typeof appInitialState

export type AppActionT = ReturnType<PropertiesType<typeof appActions>>

export type AppThunkResult<R> = ThunkResultT<R, AppActionT>