import {GetCaptchaURL} from "../types/RequestTypes";
import {instance} from "./serverApi";

export const securityAPI = {
    getCaptchaURL() {
        return instance.get<GetCaptchaURL>('/security/get-captcha-url').then(response => {
            return response.data.url
        })
    }
}