import {chatActions, chatInitialState} from "../store/reducers/ChatReducer";
import {PropertiesType, ThunkResultT} from "./GlobalTypes";

export enum ChatActionsType {
    SET_MESSAGES = 'chat/SET_MESSAGES',
    TOGGLE_IS_PORT_OPENED = 'chat/TOGGLE_IS_PORT_OPENED',
    CLEAR_MESSAGES = 'chat/CLEAR_MESSAGES'
}

export type MessageApiT = {
    message:string,
    photo:string
    userId: number,
    userName: number
}

export type MessageT = MessageApiT & {messageId: string }

export type ChatStateT = typeof chatInitialState

export type ChatActionT = ReturnType<PropertiesType<typeof chatActions>>

export type ChatThunkResultT<R> = ThunkResultT<R, ChatActionT>