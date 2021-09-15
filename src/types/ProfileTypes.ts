import {PropertiesType, ThunkResultT} from "./GlobalTypes";
import {profileActions, profileInitialState} from "../store/slice-reducers/profileReducer";

export type ProfileT = typeof profileInitialState.profile

export type ContactsT = typeof profileInitialState.profile.contacts

export type PhotosT = typeof profileInitialState.profile.photos

export type ProfileActionT = ReturnType<PropertiesType<typeof profileActions>>

export type ProfileThunkResultT<R> = ThunkResultT<R, ProfileActionT>