import {IThunkAPI, Nullable} from "../../types/GlobalTypes";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AuthThunkResultT} from "../../types/AuthTypes";
import {authAPI} from "../../serverApi/auth";
import {profileAPI} from "../../serverApi/profile";
import {securityAPI} from "../../serverApi/security";
import {ResultCodeEnum} from "../../types/RequestTypes";

export let authInitialState = {
    id: null as Nullable<number>,
    email: null as Nullable<string>,
    login: null as Nullable<string>,
    isFetching: false,
    isAuthorised: false,
    captchaUrl: null as Nullable<string>,
    photo: null as Nullable<string>,
    errorMessage: null as Nullable<string>
}

interface ISetUserData {
    id: Nullable<number>
    email: Nullable<string>
    login: Nullable<string>
    isAuthorised: boolean
    photo: Nullable<string>
}
interface ISetCaptchaUrl {
    url: string
}
interface ISetError {
    errorMessage: Nullable<string>
}

const authSlice = createSlice({
    name: 'auth',
    initialState: authInitialState,
    reducers: {
        setUserData: (state, action: PayloadAction<ISetUserData>) => {
            state.id = action.payload.id
            state.email = action.payload.email
            state.login = action.payload.login
            state.isAuthorised = action.payload.isAuthorised
            state.photo = action.payload.photo
        },
        setCaptchaUrl: (state, action: PayloadAction<ISetCaptchaUrl>) => {
            state.captchaUrl = action.payload.url
        },
        setError: (state, action: PayloadAction<ISetError>) => {
            state.errorMessage = action.payload.errorMessage
        }
    }
})


export const auth = createAsyncThunk<
    Promise<void>,
    void,
    IThunkAPI>('auth/auth', async (arg, thunkAPI) => {
    const data = await authAPI.auth()
    if (data.resultCode === 0) {
        const {id, login, email} = data.data
        const profile = await profileAPI.getProfileData(id)
        const photo = profile.photos.large
        thunkAPI.dispatch(authActions.setUserData({id, login, isAuthorised: true, email, photo}))
    }
})

export const getCaptchaURL = createAsyncThunk<
    Promise<void>,
    void,
    IThunkAPI>('auth/getCaptchaURL', async (arg, thunkAPI) => {
    const url = await securityAPI.getCaptchaURL()
    thunkAPI.dispatch(authActions.setCaptchaUrl({url}))
})

export const login = createAsyncThunk<
    Promise<void>,
    {email: string, password: string, rememberMe: boolean, captcha?: string},
    IThunkAPI>('auth/login', async ({email, password, rememberMe, captcha}, thunkAPI) => {
    let data = await authAPI.login(email, password, rememberMe, captcha)
    if (data.resultCode === ResultCodeEnum.Success) {
        thunkAPI.dispatch(auth())
        thunkAPI.dispatch(authActions.setError({errorMessage: null}))
    } else {
        if (data.resultCode === ResultCodeEnum.RequireCaptcha) {
            thunkAPI.dispatch(getCaptchaURL())
        }
        let message = data.messages.length > 0 ? data.messages[0] : 'Something went wrong!'
        thunkAPI.dispatch(authActions.setError({errorMessage: message}))
    }
})

export const logout =createAsyncThunk<
    Promise<void>,
    void,
    IThunkAPI>('auth/logout', async (arg, thunkAPI) => {
    let data = await authAPI.logout()
    if (data.resultCode === ResultCodeEnum.Success) {
        thunkAPI.dispatch(authActions.setUserData({id: null, photo: null, email: null, isAuthorised: false, login: null}))
    }
})
export const authReducer = authSlice.reducer
export const authActions = authSlice.actions
