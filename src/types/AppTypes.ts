import {PropertiesType, ThunkResultT} from "./GlobalTypes";
import {appActions, appInitialState} from "../store/slice-reducers/appReducer";

export type AppStateT = typeof appInitialState

export type AppActionT = ReturnType<PropertiesType<typeof appActions>>

export type AppThunkResult<R> = ThunkResultT<R, AppActionT>