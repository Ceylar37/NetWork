import React from 'react';
import {NavLink} from "react-router-dom";
import {UserT} from "../../../../types/UsersTypes";
import s from './User.module.scss'
import MyAvatar from "../../../common/Avatar/MyAvatar";
import {Button} from "antd";

type PropsT = {
    user: UserT,
    followingInProgress: Array<number>,

    setFollow: (id: number) => void,
    setUnfollow: (id: number) => void,
}

const User: React.FC<PropsT> = ({user, followingInProgress, setFollow, setUnfollow}) => {

    return <div className={s.userWrapper}>
        <NavLink to={'/profile/' + user.id}>
            <MyAvatar height={'100%'}/>
        </NavLink>
        <div>{user.name}
            {user.followed ? <Button type={'primary'} disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                setUnfollow(user.id);
            }}>Followed</Button> : <Button type={"primary"} disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                setFollow(user.id);
            }}>Unfollowed</Button>}
        </div>
    </div>
}

export default User;