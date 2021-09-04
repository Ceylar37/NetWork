import {Put_Delete_PostResponseT, UsersResponseT} from "../types/RequestTypes";
import {instance} from "./serverApi";

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number, term: string = '', friend: null | boolean = null) {
        return instance.get<UsersResponseT>(
            `users?page=${currentPage}&count=${pageSize}`
            + ((term !== '') ? `&term=${term}` : '')
            + ((friend === null) ? '' : `&friend=${friend}`))
            .then(response => response.data)
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