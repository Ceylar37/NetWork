import {ChatActionsType, ChatActionT, ChatStateT, ChatThunkResultT, MessageApiT, MessageT} from "../../types/ChatTypes";
import {chatApi} from "../../serverApi/chat";
import {Dispatch} from "redux";
import {v1} from 'uuid'



export let chatInitialState = {
    isPortOpened: false as boolean,
    messages: [] as Array<MessageT>
}

const chatReducer = (state: ChatStateT = chatInitialState, action: ChatActionT): ChatStateT => {
    switch (action.type) {
        case ChatActionsType.SET_MESSAGES:
            return {...state, messages: [...state.messages, ...action.payload.map(m => ({...m, messageId: v1()}))]
                    .filter((message, index, messages) => index > messages.length - 51)}
        case ChatActionsType.TOGGLE_IS_PORT_OPENED:
            return {...state, isPortOpened: action.payload}
        case ChatActionsType.CLEAR_MESSAGES:
            return {...state, messages: []}
        default:
            return state
    }
}

export const chatActions = {
    setMessages: (messages: Array<MessageApiT>) => ({type: ChatActionsType.SET_MESSAGES, payload: messages} as const),
    toggleIsPortOpened: (isOpen: boolean) => ({type: ChatActionsType.TOGGLE_IS_PORT_OPENED, payload: isOpen} as const),
    clearMessages: () => ({type: ChatActionsType.CLEAR_MESSAGES} as const)
}

let _newMessageHandler: ((messages: Array<MessageApiT>) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(chatActions.setMessages(messages))
        }
    }
    return _newMessageHandler
}

export const openWebSocketApi = (): ChatThunkResultT<Promise<void>> => async dispatch => {
    chatApi.start()
    chatApi.subscribeOnMessagesReceived(newMessageHandlerCreator(dispatch))
}

export const closeWebSocketApi = (): ChatThunkResultT<Promise<void>> => async dispatch => {
    chatApi.unsubscribeOnMessagesReceived(newMessageHandlerCreator(dispatch))
    chatApi.stop()
    dispatch(chatActions.clearMessages())
}

export const sendMessage = (message: string): ChatThunkResultT<Promise<void>> => async dispatch => {
    chatApi.sendMessage(message)
}

export default chatReducer