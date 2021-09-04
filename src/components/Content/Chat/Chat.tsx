import React, {useEffect} from 'react'
import Messages from "./Messages/Messages"
import MessageForm from "./MessageForm/MessageForm"
import {closeWebSocketApi, openWebSocketApi} from "../../../store/reducers/ChatReducer";
import {useDispatch} from "react-redux";

const Chat = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(openWebSocketApi())
        return () => {
            dispatch(closeWebSocketApi())
        }
    }, [])

    return <div>
        <Messages/>
        <hr/>
        <MessageForm/>
    </div>
}


export default Chat