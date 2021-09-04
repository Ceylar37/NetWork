import {Login_LogoutResponseT, MeResponseT, Put_Delete_PostResponseT} from "../types/RequestTypes";
import {instance} from "./serverApi";

export const authAPI = {
    auth() {
        return instance.get<MeResponseT>(`auth/me`).then(res => res.data)
    },
    login(email: string, password: string, rememberMe: boolean, captcha: string | null) {
        return instance.post<Login_LogoutResponseT>('auth/login', {
            email,
            password,
            rememberMe,
            captcha
        }).then(res => res.data)
    },
    logout() {
        return instance.delete<Put_Delete_PostResponseT>('auth/login').then(res => res.data)
    }
}