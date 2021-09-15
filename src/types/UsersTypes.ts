import {PhotosT} from "./ProfileTypes";
import {PropertiesType, ThunkResultT} from "./GlobalTypes";
import {usersActions, usersInitialState} from "../store/slice-reducers/usersReducer";

export type UsersStateT = typeof usersInitialState

export type UserT = {
    name: string,
    id: number,
    photos: PhotosT,
    status: string,
    followed: boolean
}

export type FilterT = typeof usersInitialState.filter

export type UsersActionT = ReturnType<PropertiesType<typeof usersActions>>

export type UsersThunkResultT<R> = ThunkResultT<R, UsersActionT>