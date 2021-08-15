import axios from "axios"
import {
    GetCaptchaURL,
    Login_LogoutResponseT,
    MeResponseT,
    Put_Delete_PostResponseT,
    UpdateProfilePhotoResponseT,
    UsersResponseT
} from "../types/RequestTypes";
import {ProfileT} from "../types/ProfileTypes";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '7c7563a7-db12-47a6-85c2-53f6a38f3729',
    }
})

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get<UsersResponseT>(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data)
    },
    follow(id: number) {
        return instance.post<Put_Delete_PostResponseT>(`follow/${id}`).then(response => {
            return response.data.resultCode
        })

    },

    unfollow(id: number) {
        return instance.delete<Put_Delete_PostResponseT>(`follow/${id}`).then(response => {
            return response.data.resultCode
        })
    },
}

export const authAPI = {
    auth() {
        return instance.get<MeResponseT>(`auth/me`).then(res => res.data)
    },
    login(email: string, password: string, rememberMe: boolean, captcha: string | null) {
        return instance.post<Login_LogoutResponseT>('auth/login', {email, password, rememberMe, captcha}).then(res => res.data)
    },
    logout() {
        return instance.delete<Put_Delete_PostResponseT>('auth/login').then(res => res.data)
    }
}

export const profileAPI = {
    getProfileData(id: number) {
        return instance.get<ProfileT>('profile/' + id).then(response => {
            return response.data
        })
    },

    getStatus(id: number) {
        return instance.get<string>('profile/status/' + id).then(response => {
            return response.data
        })
    },

    updateStatus(status: string) {
        return instance.put<Put_Delete_PostResponseT>('profile/status', {status}).then(response => {
            return response.data.resultCode
        })
    },

    updateProfilePhoto(image: File) {
        const formData = new FormData()
        formData.append("image", image)
        return instance.put<UpdateProfilePhotoResponseT>('/profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            return response.data
        })
    },

    updateProfileInfo(profileInfo: ProfileT) {
        return instance.put<Put_Delete_PostResponseT>('/profile', profileInfo)
    }
}

export const securityAPI = {
    getCaptchaURL() {
        return instance.get<GetCaptchaURL>('/security/get-captcha-url').then(response => {
            return response.data.url
        })
    }
}