import React from 'react';
import {NavLink} from "react-router-dom";
import {UserT} from "../../../../types/UsersTypes";
import s from './User.module.scss'

type PropsT = {
    user: UserT,
    followingInProgress: Array<number>,

    setFollow: (id: number) => void,
    setUnfollow: (id: number) => void,
}

const User: React.FC<PropsT> = ({user, followingInProgress, setFollow, setUnfollow}) => {

    return <div className={s.userWrapper}>
        <NavLink to={'/profile/' + user.id}>
            <img className={s.image}
                 src={user.photos?.large !== null ? user.photos?.large : "https://zohowebstatic.com/sites/default/files/ogimage/people-logo.png"}/>
        </NavLink>
        <div>{user.name}
            {user.followed ? <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                setUnfollow(user.id);
            }}>Follow</button> : <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                setFollow(user.id);
            }}>Unfollow</button>}
        </div>
    </div>
}

export default User;