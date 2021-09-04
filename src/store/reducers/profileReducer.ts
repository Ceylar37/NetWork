import {Nullable} from "../../types/GlobalTypes";
import {
    profileActionsTypes,
    ProfileActionT,
    ProfileStateT,
    ProfileT,
    ProfileThunkResultT
} from "../../types/ProfileTypes";
import {ResultCodeEnum} from "../../types/RequestTypes";
import {profileAPI} from "../../serverApi/profile";

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
    errorMessages: null as Nullable<Array<string>>
}

const profileReducer = (state = profileInitialState, action: ProfileActionT): ProfileStateT => {
    switch (action.type) {
        case profileActionsTypes.SET_USER_PROFILE:
            return {...state, profile: action.payload}
        case profileActionsTypes.SET_FETCH:
            return {...state, isFetching: action.payload}
        case profileActionsTypes.SET_STATUS:
            return {...state, status: action.payload}
        case profileActionsTypes.UPDATE_PROFILE_PHOTO:
            return {
                ...state,
                profile: {...state.profile, photos: {small: state.profile.photos.small, large: action.payload}}
            }
        case profileActionsTypes.UPDATE_PROFILE_INFO:
            return {
                ...state, profile: {
                    ...state.profile, lookingForAJob: action.payload.lookingForAJob,
                    lookingForAJobDescription: action.payload.lookingForAJobDescription,
                    aboutMe: action.payload.aboutMe,
                    contacts: {
                        ...state.profile.contacts, github: action.payload.contacts.github,
                        vk: action.payload.contacts.vk,
                        facebook: action.payload.contacts.facebook,
                        instagram: action.payload.contacts.instagram,
                        twitter: action.payload.contacts.twitter,
                        website: action.payload.contacts.website,
                        youtube: action.payload.contacts.youtube,
                        mainLink: action.payload.contacts.mainLink
                    }
                }
            }
        case profileActionsTypes.EDIT_ERROR_MESSAGE:
            return {
                ...state,
            errorMessages: action.payload}
        default:
            return state
    }
}

export const profileActions = {
    newUserProfile: (profile: ProfileT) => ({type: profileActionsTypes.SET_USER_PROFILE, payload: profile} as const),
    setFetch: (isFetching: boolean) => ({type: profileActionsTypes.SET_FETCH, payload: isFetching} as const),
    setStatus: (status: string) => ({type: profileActionsTypes.SET_STATUS, payload: status} as const),
    refreshProfilePhoto: (image: string) => ({type: profileActionsTypes.UPDATE_PROFILE_PHOTO, payload: image} as const),
    setProfileInfo: (profileInfo: ProfileT) => ({type: profileActionsTypes.UPDATE_PROFILE_INFO, payload: profileInfo} as const),
    editErrorMessage: (errorMessages: Nullable<Array<string>>) => ({type: profileActionsTypes.EDIT_ERROR_MESSAGE, payload: errorMessages} as const)
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

    export const updateProfileInfo = (payload: ProfileT): ProfileThunkResultT<Promise<void>> => async dispatch => {
        let response = await profileAPI.updateProfileInfo(payload)
        if (!response.data.resultCode) {
            dispatch(profileActions.setProfileInfo(payload))
            dispatch(profileActions.editErrorMessage(null));
        } else {
            dispatch(profileActions.editErrorMessage(response.data.messages))
        }
    }



export default profileReducer;