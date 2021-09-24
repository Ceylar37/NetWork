import axios from "axios"

export const BASE_URL: string = 'https://social-network.samuraijs.com/api/1.0/'

export const instance = axios.create({
    withCredentials: true,
    baseURL: BASE_URL,
    headers: {
        'API-KEY': '7c7563a7-db12-47a6-85c2-53f6a38f3729',
    }
})