import {MessageApiT, MessageT} from "../../types/ChatTypes";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {v1} from "uuid";
import {Dispatch} from "redux";
import {chatApi} from "../../serverApi/chat";
import {IThunkAPI} from "../../types/GlobalTypes";

export let chatInitialState = {
    isPortOpened: false as boolean,
    messages: [] as Array<MessageT>
}

interface ISetMessages {
    messages: Array<MessageApiT>
}

const chatSlice = createSlice({
    name: 'chatPage',
    initialState: chatInitialState,
    reducers: {
        setMessages: (state, action: PayloadAction<ISetMessages>) => {
            (state.messages.concat(action.payload.messages.map(m => {
                return {...m, messageId: v1()}
            }))).filter((message, index, messages) => {
                return index > messages.length - 51
            })
        },
        clearMessages: state => {
            state.messages = []
        }
    }
})

let _newMessageHandler: ((messages: Array<MessageApiT>) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(chatActions.setMessages({messages}))
        }
    }
    return _newMessageHandler
}

export const openWebSocketApi = createAsyncThunk<
    Promise<void>,
    void,
    IThunkAPI>('chat/openWebSocketApi', async (arg, thunkAPI) => {
    chatApi.start()
    chatApi.subscribeOnMessagesReceived(newMessageHandlerCreator(thunkAPI.dispatch))
})

export const closeWebSocketApi = createAsyncThunk<
    Promise<void>,
    void,
    IThunkAPI>('chat/closeWebSocketApi', async (arg, thunkAPI) => {
    chatApi.unsubscribeOnMessagesReceived(newMessageHandlerCreator(thunkAPI.dispatch))
    chatApi.stop()
    thunkAPI.dispatch(chatActions.clearMessages())
})

export const sendMessage = createAsyncThunk<
    Promise<void>,
    string,
    IThunkAPI>('chat/sendMessage', async (message, thunkAPI) => {
    chatApi.sendMessage(message)
})

export const chatReducer = chatSlice.reducer
export const chatActions = chatSlice.actions