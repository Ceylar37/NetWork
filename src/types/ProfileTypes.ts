import {profileActions, profileInitialState} from "../store/reducers/profileReducer";
import {PropertiesType, ThunkResultT} from "./GlobalTypes";

export enum profileActionsTypes {
    SET_USER_PROFILE = 'profile/SET-USER-PROFILE',
    SET_FETCH = 'profile/SET-FETCH',
    SET_STATUS = 'profile/SET-STATUS',
    UPDATE_PROFILE_PHOTO = 'profile/UPDATE-PROFILE-PHOTO',
    UPDATE_PROFILE_INFO = 'profile/UPDATE-PROFILE-INFO'
}

export type ProfileStateT = typeof profileInitialState

export type ProfileT = typeof profileInitialState.profile

export type ContactsT = typeof profileInitialState.profile.contacts

export type PhotosT = typeof profileInitialState.profile.photos

export type ProfileActionT = ReturnType<PropertiesType<typeof profileActions>>

export type ProfileThunkResultT<R> = ThunkResultT<R, ProfileActionT>