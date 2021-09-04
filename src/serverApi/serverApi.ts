import axios from "axios"

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '7c7563a7-db12-47a6-85c2-53f6a38f3729',
    }
})







