import {ProfileT} from "../types/ProfileTypes";
import {Put_Delete_PostResponseT, UpdateProfilePhotoResponseT} from "../types/RequestTypes";
import {instance} from "./serverApi";

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