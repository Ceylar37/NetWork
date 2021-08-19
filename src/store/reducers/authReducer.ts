import {AuthActionsType, AuthActionT, AuthStateT, AuthThunkResultT} from "../../types/AuthTypes";
import {authAPI, profileAPI, securityAPI} from "../../serverApi/serverApi";
import {ResultCodeEnum} from "../../types/RequestTypes";
import {Nullable} from "../../types/GlobalTypes";

export let authInitialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isFetching: false,
    isAuthorised: false,
    captchaUrl: null as string | null,
    photo: null as string | null,
    errorMessage: null as string | null
}

const authReducer = (state = authInitialState, action: AuthActionT): AuthStateT => {
    switch (action.type) {
        case AuthActionsType.SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            }
        case AuthActionsType.SET_CAPTCHA_URL:
            return {
                ...state,
                captchaUrl: action.url,
            }
        case AuthActionsType.SET_ERROR:
            return {
                ...state,
                errorMessage: action.errorMessage
            }
        default:
            return state
    }
}

export const authActions = {
    setUserData: (id: Nullable<number>, email: Nullable<string>, login: Nullable<string>, photo: Nullable<string>,  isAuthorised: boolean) => ({
        type: AuthActionsType.SET_USER_DATA, payload: {id, email, login, photo, isAuthorised}
    } as const),
    setCaptchaUrl: (url: string) => ({type: AuthActionsType.SET_CAPTCHA_URL, url} as const),
    setErrors: (errorMessage: Nullable<string>) => ({type: AuthActionsType.SET_ERROR, errorMessage} as const)
}

export const auth = (): AuthThunkResultT<Promise<void>> => async dispatch => {
    const data = await authAPI.auth()
    if (data.resultCode === 0) {
        const {id, login, email} = data.data
        const profile = await profileAPI.getProfileData(id)
        const photo = profile.photos.large
        dispatch(authActions.setUserData(id, login, email, photo, true))
    }
}

const getCaptchaURL = (): AuthThunkResultT<Promise<void>> => async dispatch => {
    let url = await securityAPI.getCaptchaURL()
    dispatch(authActions.setCaptchaUrl(url))
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string | null = null)
    : AuthThunkResultT<Promise<void>> => async dispatch => {
    let data = await authAPI.login(email, password, rememberMe, captcha)
    if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(auth())
        dispatch(authActions.setErrors(null))
    } else {
        if (data.resultCode === ResultCodeEnum.RequireCaptcha) {
            dispatch(getCaptchaURL())
        }
        let message = data.messages.length > 0 ? data.messages[0] : 'Something went wrong!'
        dispatch(authActions.setErrors(message))
    }
}

export const logout = (): AuthThunkResultT<Promise<void>> => async dispatch => {
    let data = await authAPI.logout()
    if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(authActions.setUserData(null, null, null,null, false))
    }
}

export default authReducer;