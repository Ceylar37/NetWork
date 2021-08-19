import {Nullable, RootStateT} from "../types/GlobalTypes";

export const getLogin = (state: RootStateT): Nullable<string> => state.auth.login

export const getIsAuthorised = (state: RootStateT): boolean => state.auth.isAuthorised

export const getMyId = (state: RootStateT): Nullable<number> => state.auth.id

export const getInitialize = (state: RootStateT): boolean => state.app.initialized

export const getCaptchaUrl = (state: RootStateT): Nullable<string> => state.auth.captchaUrl

export const getErrorMessage = (state: RootStateT): Nullable<string> => state.auth.errorMessage