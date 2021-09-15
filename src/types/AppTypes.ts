import {PropertiesType, ThunkResultT} from "./GlobalTypes";
import {appActions} from "../store/slice-reducers/appReducer";

export type AppActionT = ReturnType<PropertiesType<typeof appActions>>

export type AppThunkResult<R> = ThunkResultT<R, AppActionT>