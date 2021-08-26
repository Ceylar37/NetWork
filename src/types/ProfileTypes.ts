import {profileActions, profileInitialState} from "../store/reducers/profileReducer";
import {PropertiesType, ThunkResultT} from "./GlobalTypes";

export enum profileActionsTypes {
    SET_USER_PROFILE = 'profile/SET_USER_PROFILE',
    SET_FETCH = 'profile/SET_FETCH',
    SET_STATUS = 'profile/SET_STATUS',
    UPDATE_PROFILE_PHOTO = 'profile/UPDATE_PROFILE_PHOTO',
    UPDATE_PROFILE_INFO = 'profile/UPDATE_PROFILE_INFO',
    EDIT_ERROR_MESSAGE = 'profile/EDIT_ERROR_MESSAGE'
}

export type ProfileStateT = typeof profileInitialState

export type ProfileT = typeof profileInitialState.profile

export type ContactsT = typeof profileInitialState.profile.contacts

export type PhotosT = typeof profileInitialState.profile.photos

export type ProfileActionT = ReturnType<PropertiesType<typeof profileActions>>

export type ProfileThunkResultT<R> = ThunkResultT<R, ProfileActionT>