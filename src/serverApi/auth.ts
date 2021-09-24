import {LoginResponseT, MeResponseT, Put_Delete_PostResponseT} from "../types/RequestTypes";
import {instance} from "./serverApi";

export const authAPI = {
    auth() {
        return instance.get<MeResponseT>(`auth/me`).then(res => res.data)
    },
    login(email: string, password: string, rememberMe: boolean, captcha?: string) {
        return instance.post<LoginResponseT>('auth/login', {
            email,
            password,
            rememberMe,
            captcha
        }).then(res => {
            return res.data
        })
    },
    logout() {
        return instance.delete<Put_Delete_PostResponseT>('auth/login').then(res => res.data)
    }
}