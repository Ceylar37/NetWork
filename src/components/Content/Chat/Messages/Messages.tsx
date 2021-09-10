import React, {useEffect, useRef, useState} from 'react'
import {useSelector} from "react-redux";
import {getMessages} from "../../../../selectors/chat-selectors";
import s from './Messages.module.scss'
import Message from "./Message";
import {Nullable} from "../../../../types/GlobalTypes";
import {getMyId} from "../../../../selectors/auth-selector";

const Messages:React.FC = () => {
    const messages = useSelector(getMessages)
    const myId: Nullable<number> = useSelector(getMyId)
    const [isAutoScroll, editIsAutoScroll] = useState<boolean>(true)
    const scrollableDiv = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (isAutoScroll) {
            scrollableDiv.current?.scrollIntoView()
        }
    }, [messages, isAutoScroll])


    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const curElement = e.currentTarget
        if (Math.abs((curElement.scrollHeight - curElement.scrollTop) - curElement.clientHeight) < 100) {
            editIsAutoScroll(true)
        } else {
            editIsAutoScroll(false)
        }
    }

    return <div className={s.messagesWrapper} onScroll={scrollHandler}>
        {
            messages.map((message) =>
                <Message message={message} key={message.messageId} myId={myId}/>)
        }
        <div ref={scrollableDiv}/>
    </div>
}

export default Messages