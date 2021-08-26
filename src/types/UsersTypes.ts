import {usersActions, usersInitialState} from "../store/reducers/usersReducer";
import {PhotosT} from "./ProfileTypes";
import {PropertiesType, ThunkResultT} from "./GlobalTypes";

export enum UsersActionsTypes {
    FOLLOW = 'users/FOLLOW',
    UNFOLLOW = 'users/UNFOLLOW',
    SET_USERS = 'users/SET-USERS',
    SET_CURRENT_PAGE = 'users/SET-CURRENT-PAGE',
    SET_TOTAL_COUNT = 'users/SET-TOTAL-USERS-COUNT',
    SET_FETCH = 'users/SET-FETCH',
    TOGGLE_IS_FOLLOWING_PROGRESS = 'users/TOGGLE-IS-FOLLOWING-PROGRESS',
    CHANGE_CURRENT_PORTION = 'users/CHANGE-CURRENT-PORTION',
    CHANGE_FILTER = 'users/CHANGE_FILTER'
}

export type UsersStateT = typeof usersInitialState

export type UserT = {
    name: string,
    id: number,
    photos: PhotosT,
    status: string,
    followed: boolean
}

export type FilterT = {
    term: string
    followed: null | boolean
}

export type UsersActionT = ReturnType<PropertiesType<typeof usersActions>>

export type UsersThunkResultT<R> = ThunkResultT<R, UsersActionT>