import React, {useEffect} from 'react'
import Messages from "./Messages/Messages"
import MessageForm from "./MessageForm/MessageForm"
import {useDispatch} from "react-redux";
import {closeWebSocketApi, openWebSocketApi} from "../../../store/slice-reducers/chatReducer";

const Chat = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(openWebSocketApi())
        return () => {
            dispatch(closeWebSocketApi())
        }
    }, [dispatch])

    return <div>
        <Messages/>
        <hr/>
        <MessageForm/>
    </div>
}


export default Chat