import {PropertiesType, ThunkResultT} from "./GlobalTypes";
import {chatActions} from "../store/slice-reducers/chatReducer";

export type MessageApiT = {
    message:string,
    photo:string
    userId: number,
    userName: number
}

export type MessageT = MessageApiT & {messageId: string }

export type ChatActionT = ReturnType<PropertiesType<typeof chatActions>>

export type ChatThunkResultT<R> = ThunkResultT<R, ChatActionT>