import {RootStateT} from "../types/GlobalTypes";
import {MessageT} from "../types/ChatTypes";

export const getMessages = (state: RootStateT): Array<MessageT> => state.chatPage.messages

export const getIsPortOpened = (state: RootStateT): boolean => state.chatPage.isPortOpened