import {AppDispatch, IThunkAPI, Nullable} from "../../types/GlobalTypes";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ProfileT, ProfileThunkResultT} from "../../types/ProfileTypes";
import {profileAPI} from "../../serverApi/profile";
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
    errorMessages: null as Nullable<Array<string>>
}

interface ISetUserProfile {
    profile: ProfileT
}

interface ISetFetch {
    isFetching: boolean
}

interface ISetStatus {
    status: string
}

interface IUpdateProfilePhoto {
    image: string
}

interface IUpdateProfileInfo {
    profileInfo: ProfileT
}

interface IEditErrorMessage {
    errorMessages: Nullable<Array<string>>
}

const profileSlice = createSlice({
    name: 'profilePage',
    initialState: profileInitialState,
    reducers: {
        setUserProfile: (state, action: PayloadAction<ISetUserProfile>) => {
            state.profile = action.payload.profile
        },
        setFetch: (state, action: PayloadAction<ISetFetch>) => {
            state.isFetching = action.payload.isFetching
        },
        setStatus: (state, action: PayloadAction<ISetStatus>) => {
            state.status = action.payload.status
        },
        updateProfilePhoto: (state, action: PayloadAction<IUpdateProfilePhoto>) => {
            state.profile.photos.large = action.payload.image
        },
        updateProfileInfo: (state, action: PayloadAction<IUpdateProfileInfo>) => {
            state.profile = action.payload.profileInfo
        },
        editErrorMessage: (state, action: PayloadAction<IEditErrorMessage>) => {
            state.errorMessages = action.payload.errorMessages
        }
    }
})

export const setProfileData = createAsyncThunk<Promise<void>,
    number,
    IThunkAPI>('profile/setProfileData', async (id, thunkAPI) => {
    thunkAPI.dispatch(profileActions.setFetch({isFetching: true}))
    let data = await profileAPI.getProfileData(id)
    thunkAPI.dispatch(profileActions.setUserProfile({profile: data}))
    thunkAPI.dispatch(profileActions.setFetch({isFetching: false}))
})

export const updateProfilePhoto = createAsyncThunk<Promise<void>,
    File,
    IThunkAPI>('profile/updateProfilePhoto', async (image, thunkAPI) => {
    let data = await profileAPI.updateProfilePhoto(image)
    if (data.resultCode === ResultCodeEnum.Success && data.data.photos.large != null) {
        thunkAPI.dispatch(profileActions.updateProfilePhoto({image: data.data.photos.large}))
    }
})

export const requestStatus = createAsyncThunk<Promise<void>,
    number,
    IThunkAPI>('profile/requestStatus', async (id, thunkAPI) => {
    let statusText = await profileAPI.getStatus(id)
    thunkAPI.dispatch(profileActions.setStatus({status: statusText}))
})

export const updateStatus = createAsyncThunk<Promise<void>,
    string,
    IThunkAPI>('profile/updateStatus', async (status, thunkAPI) => {
    let resultCode = await profileAPI.updateStatus(status)
    if (resultCode === ResultCodeEnum.Success) {
        thunkAPI.dispatch(profileActions.setStatus({status}))
    }
})

export const updateProfileInfo = createAsyncThunk<
    Promise<void>,
    ProfileT,
    IThunkAPI>('profile/updateProfileInfo', async (payload, thunkAPI) => {
    let response = await profileAPI.updateProfileInfo(payload)
    if (!response.data.resultCode) {
        thunkAPI.dispatch(profileActions.updateProfileInfo({profileInfo: payload}))
        thunkAPI.dispatch(profileActions.editErrorMessage({errorMessages: null}));
    } else {
        thunkAPI.dispatch(profileActions.editErrorMessage({errorMessages: response.data.messages}))
    }
})

export const profileReducer = profileSlice.reducer
export const profileActions = profileSlice.actions