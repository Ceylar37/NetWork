import {Nullable} from "../../types/GlobalTypes";
import {
    profileActionsTypes,
    ProfileActionT,
    ProfileStateT,
    ProfileT,
    ProfileThunkResultT
} from "../../types/ProfileTypes";
import {profileAPI} from "../../serverApi/serverApi";
import {ResultCodeEnum} from "../../types/RequestTypes";

export const profileInitialState = {
    profile: {
        userId: null as Nullable<number>,
        lookingForAJob: null as Nullable<boolean>,
        lookingForAJobDescription: null as Nullable<string>,
        fullName: null as Nullable<string>,
        aboutMe: null as Nullable<string>,
        contacts: {
            github: null as Nullable<string>,
            vk: null as Nullable<string>,
            facebook: null as Nullable<string>,
            instagram: null as Nullable<string>,
            twitter: null as Nullable<string>,
            website: null as Nullable<string>,
            youtube: null as Nullable<string>,
            mainLink: null as Nullable<string>
        },
        photos: {
            small: null as Nullable<string>,
            large: null as Nullable<string>
        }
    },
    isFetching: false,
    status: '',
}

const profileReducer = (state = profileInitialState, action: ProfileActionT): ProfileStateT => {
    switch (action.type) {
        case profileActionsTypes.SET_USER_PROFILE:
            return {...state, profile: action.profile}
        case profileActionsTypes.SET_FETCH:
            return {...state, isFetching: action.isFetching}
        case profileActionsTypes.SET_STATUS:
            return {...state, status: action.status}
        case profileActionsTypes.UPDATE_PROFILE_PHOTO:
            return {
                ...state,
                profile: {...state.profile, photos: {small: state.profile.photos.small, large: action.image}}
            }
        case profileActionsTypes.UPDATE_PROFILE_INFO:
            return {
                ...state, profile: {
                    ...state.profile, lookingForAJob: action.profileInfo.lookingForAJob,
                    lookingForAJobDescription: action.profileInfo.lookingForAJobDescription,
                    aboutMe: action.profileInfo.aboutMe,
                    contacts: {
                        ...state.profile.contacts, github: action.profileInfo.contacts.github,
                        vk: action.profileInfo.contacts.vk,
                        facebook: action.profileInfo.contacts.facebook,
                        instagram: action.profileInfo.contacts.instagram,
                        twitter: action.profileInfo.contacts.twitter,
                        website: action.profileInfo.contacts.website,
                        youtube: action.profileInfo.contacts.youtube,
                        mainLink: action.profileInfo.contacts.mainLink
                    }
                }
            }
        default:
            return state
    }
}

export const profileActions = {
    newUserProfile: (profile: ProfileT) => ({type: profileActionsTypes.SET_USER_PROFILE, profile} as const),
    setFetch: (isFetching: boolean) => ({type: profileActionsTypes.SET_FETCH, isFetching} as const),
    setStatus: (status: string) => ({type: profileActionsTypes.SET_STATUS, status} as const),
    refreshProfilePhoto: (image: string) => ({type: profileActionsTypes.UPDATE_PROFILE_PHOTO, image} as const),
    setProfileInfo: (profileInfo: ProfileT) => ({type: profileActionsTypes.UPDATE_PROFILE_INFO, profileInfo} as const)
}

    export const setProfileData = (id: number): ProfileThunkResultT<Promise<void>> => async dispatch => {
        dispatch(profileActions.setFetch(true))
        let data = await profileAPI.getProfileData(id)
        dispatch(profileActions.setFetch(false))
        dispatch(profileActions.newUserProfile(data))
    }

    export const updateProfilePhoto = (image: File): ProfileThunkResultT<Promise<void>> => async dispatch => {
        let data = await profileAPI.updateProfilePhoto(image)
        if (data.resultCode === ResultCodeEnum.Success && data.data.photos.large != null) {
            dispatch(profileActions.refreshProfilePhoto(data.data.photos.large))
        }
    }

    export const requestStatus = (id: number): ProfileThunkResultT<Promise<void>> => async dispatch => {
        let statusText = await profileAPI.getStatus(id)
        dispatch(profileActions.setStatus(statusText))
    }

    export const updateStatus = (status: string): ProfileThunkResultT<Promise<void>> => async dispatch => {
        let resultCode = await profileAPI.updateStatus(status)
        if (resultCode === ResultCodeEnum.Success) {
            dispatch(profileActions.setStatus(status))
        }
    }

    export const updateProfileInfo = (profileInfo: ProfileT): ProfileThunkResultT<Promise<0 | Array<string>>> => async dispatch => {
        let response = await profileAPI.updateProfileInfo(profileInfo)
        if (!response.data.resultCode) {
            dispatch(profileActions.setProfileInfo(profileInfo))
            return 0;
        } else {
            return response.data["messages"]
        }
    }



export default profileReducer;