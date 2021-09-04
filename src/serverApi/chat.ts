import {MessageApiT} from "../types/ChatTypes";

type StatusT = 'pending' | 'ready' | 'error'
type MessagesReceivedSubscriberType = (messages: Array<MessageApiT>) => void
type StatusChangedSubscriberType = (status: StatusT) => void

let ws: WebSocket | null = null

const subscribers = {
    'messages-received': [] as Array<MessagesReceivedSubscriberType>,
    'status-changed': [] as Array<StatusChangedSubscriberType>
}

const closeHandler = () => {
    console.log('WS CLOSED ON ERROR')
    notifySubscribersAboutStatus('pending')
    setTimeout(createChannel, 3000)
}
const messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data)
    subscribers['messages-received'].forEach(s => s(newMessages))
}
const openHandler = () => {
    notifySubscribersAboutStatus('ready')
}
const errorHandler = () => {
    notifySubscribersAboutStatus('error')
    console.log('REFRESH PAGE')
}

const cleanUpWsEventListeners = () => {
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('message', messageHandler)
    ws?.removeEventListener('open', openHandler)
    ws?.removeEventListener('error', errorHandler)
}

function createChannel() {
    cleanUpWsEventListeners()
    ws?.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    notifySubscribersAboutStatus('pending')
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)
    ws.addEventListener('open', openHandler)
    ws.addEventListener('error', errorHandler)
}

const notifySubscribersAboutStatus = (status: StatusT) => {
    subscribers['status-changed'].forEach(s => s(status))
}

export const chatApi = {
    start() {
        createChannel()
    },
    stop() {
        subscribers['messages-received'] = []
        subscribers['status-changed'] = []
        cleanUpWsEventListeners()
        ws?.close()
    },
    subscribeOnMessagesReceived(callback: MessagesReceivedSubscriberType) {
        subscribers['messages-received'].push(callback)
    },
    unsubscribeOnMessagesReceived(callback: MessagesReceivedSubscriberType) {
        subscribers['messages-received'].filter(s => s !== callback)
    },
    subscribeOnStatusChanged(callback: StatusChangedSubscriberType) {
        subscribers['status-changed'].push(callback)
    },
    unsubscribeOnStatusChanged(callback: StatusChangedSubscriberType) {
        subscribers["status-changed"].filter(s => s !== callback)

    },
    sendMessage(message: string) {
        ws?.send(message)
    }
}