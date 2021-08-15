import {Nullable, RootStateT} from "../types/GlobalTypes";
import {ProfileT} from "../types/ProfileTypes";

export const getProfile = (state: RootStateT): ProfileT => {
    return state.profilePage.profile
}

export const getIsProfileFetching = (state: RootStateT): boolean => {
    return state.profilePage.isFetching
}

export const getStatus = (state: RootStateT):string => {
    return state.profilePage.status
}

export const getProfileImg = (state: RootStateT): Nullable<string> => {
    return state.auth.photo
}