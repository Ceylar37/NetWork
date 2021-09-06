import React from 'react'
import {MessageApiT} from "../../../../types/ChatTypes"
import s from './Messages.module.scss'
import MyAvatar from "../../../common/Avatar/MyAvatar";
import {NavLink} from "react-router-dom";
import {Nullable} from "../../../../types/GlobalTypes";

type PropsT = {
    message: MessageApiT
    myId: Nullable<number>
}

const Message: React.FC<PropsT> = React.memo((props) => {
    if (props.message.userId === props.myId) {
        return (
            <div  className={s.messageWrapper + ' ' + s.myMessageWrapper}>
                <span className={s.messageText}>{props.message.message}</span>
            </div>
        )
    }
    return (
        <div className={s.messageWrapper}>
            <NavLink to={'/profile/' + props.message.userId}>
                <MyAvatar src={props.message.photo} borderRadius={'10px'} height={'40px'}/>
            </NavLink>
            <span className={s.messageText + ' ' + s.othersMessageText}>
                {props.message.userName}
                <br/>
                {props.message.message}
            </span>
        </div>
    )
})

export default Message