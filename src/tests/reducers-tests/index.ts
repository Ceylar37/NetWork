import thunk, {ThunkDispatch} from "redux-thunk";
import {RootStateT} from "../../types/GlobalTypes";
import {AnyAction} from "redux";
import configureMockStore from "redux-mock-store";
import {
    LoginResponseT,
    MeResponseT,
    Put_Delete_PostResponseT,
    ResultCodeEnum,
    UpdateProfilePhotoResponseT,
    UsersResponseT
} from "../../types/RequestTypes";
import {usersAPI} from "../../serverApi/users";
import {ProfileT} from "../../types/ProfileTypes";
import {authAPI} from "../../serverApi/auth";
import {profileAPI} from "../../serverApi/profile";
import {securityAPI} from "../../serverApi/security";
import {AxiosResponse} from "axios";

type DispatchExts = ThunkDispatch<RootStateT, void, AnyAction>

export const mockStore = configureMockStore<any, DispatchExts>([thunk])({})
export const getActions: () => AnyAction[] = mockStore.getActions

export const mockResponses = {
    getUsers: {
        totalCount: 1,
        items: [],
        error: []
    } as UsersResponseT,
    getProfileData: {
        userId: 1,
        aboutMe: 'a',
        fullName: 'b',
        lookingForAJob: true,
        lookingForAJobDescription: 'asd',
        photos: {
            large: 'asfd',
            small: 'afff'
        },
        contacts: {
            facebook: 'lgjg',
            github: 'skafhj',
            instagram: 'sapfiohub',
            mainLink: 'asfjn',
            twitter: 'pns',
            vk: 'asofjihon',
            website: null,
            youtube: 'rtyu'
        }
    } as ProfileT,
    getStatus: 'asgf' as string,
    auth: {
        data: {
            email: 'asg',
            id: 2,
            login: 'asjfhn'
        },
        messages: [],
        resultCode: ResultCodeEnum.Success
    } as MeResponseT,
    getCaptchaURL: 'ojink' as string,
    login: {
        resultCode: ResultCodeEnum.Success,
        messages: [],
        fieldsErrors: [],
        data: {
            userId: 19
        }
    } as LoginResponseT,
    logout: {
        data: {
            userId: 10,
        },
        fieldsErrors: [],
        messages: [],
        resultCode: ResultCodeEnum.Success
    } as Put_Delete_PostResponseT,
    updateProfilePhoto: {
        resultCode: ResultCodeEnum.Success,
        messages: [],
        fieldsErrors: [],
        data: {
            photos: {
                large: 'sagasgf',
                small: 'jhg'
            }
        }
    } as UpdateProfilePhotoResponseT,
    updateProfileInfo: {
        data: {
            data: {
                userId: 90
            },
            resultCode: ResultCodeEnum.Success,
            messages: [] as string[],
            fieldsErrors: []
        }
    } as AxiosResponse<Put_Delete_PostResponseT>
}

export const spyAllAPIMethodsAndClearActions = () => {

    jest.spyOn(usersAPI, 'getUsers').mockResolvedValue(mockResponses.getUsers)
    jest.spyOn(usersAPI, 'follow').mockResolvedValue(ResultCodeEnum.Success)
    jest.spyOn(usersAPI, 'unfollow').mockResolvedValue(ResultCodeEnum.Success)

    jest.spyOn(authAPI, 'auth').mockResolvedValue(mockResponses.auth)
    jest.spyOn(authAPI, 'logout').mockResolvedValue(mockResponses.logout)
    jest.spyOn(authAPI, 'login').mockResolvedValue(mockResponses.login)

    jest.spyOn(profileAPI, 'getProfileData').mockResolvedValue(mockResponses.getProfileData)
    jest.spyOn(profileAPI, 'getStatus').mockResolvedValue(mockResponses.getStatus)
    jest.spyOn(profileAPI, 'updateStatus').mockResolvedValue(ResultCodeEnum.Success)
    jest.spyOn(profileAPI, 'updateProfilePhoto').mockResolvedValue(mockResponses.updateProfilePhoto)
    jest.spyOn(profileAPI, 'updateProfileInfo').mockResolvedValue(mockResponses.updateProfileInfo)

    jest.spyOn(securityAPI, 'getCaptchaURL').mockResolvedValue(mockResponses.getCaptchaURL)

    mockStore.clearActions()
}