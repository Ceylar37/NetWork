import {usersActions, usersInitialState} from "../store/reducers/usersReducer";
import {PhotosT} from "./ProfileTypes";
import {PropertiesType, ThunkResultT} from "./GlobalTypes";

export enum UsersActionsTypes {
    FOLLOW = 'user/FOLLOW',
    UNFOLLOW = 'user/UNFOLLOW',
    SET_USERS = 'user/SET-USERS',
    SET_CURRENT_PAGE = 'user/SET-CURRENT-PAGE',
    SET_TOTAL_COUNT = 'user/SET-TOTAL-USERS-COUNT',
    SET_FETCH = 'user/SET-FETCH',
    TOGGLE_IS_FOLLOWING_PROGRESS = 'user/TOGGLE-IS-FOLLOWING-PROGRESS',
    CHANGE_CURRENT_PORTION = 'CHANGE-CURRENT-PORTION',
}

export type UsersStateT = typeof usersInitialState

export type UserT = {
    name: string,
    id: number,
    photos: PhotosT,
    status: string,
    followed: boolean
}

export type UsersActionT = ReturnType<PropertiesType<typeof usersActions>>

export type UsersThunkResultT<R> = ThunkResultT<R, UsersActionT>