import {UserT} from "./UsersTypes";
import {PhotosT} from "./ProfileTypes";

export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
    RequireCaptcha = 10
}

export type UsersResponseT = {
    items: Array<UserT>,
    totalCount: number,
    error: Array<string>,
}

export type MeResponseT = {
    data: {
        id: number,
        email: string,
        login: string
    },
    resultCode: ResultCodeEnum,
    messages: Array<string>
}

type DefaultServerResponseT<D> = {
    resultCode: ResultCodeEnum,
    messages: Array<string>,
    data: D
    fieldsErrors?: []
}

export type Put_Delete_PostResponseT = DefaultServerResponseT<{ userId: number }>

export type LoginResponseT = DefaultServerResponseT<{ userId: number }>

export type UpdateProfilePhotoResponseT = DefaultServerResponseT<{ photos: PhotosT }>

export type GetCaptchaURL = {
    url: string
}