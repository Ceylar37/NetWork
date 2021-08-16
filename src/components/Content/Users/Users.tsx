import React from 'react'
import {UsersActionsTypes, UserT} from "../../../types/UsersTypes"
import User from "./User/User"
import s from './Users.module.scss'
import Pagination from "../../common/Pagination/Pagination";
import UsersSearchForm from "./UsersSearchForm/UsersSearchForm";

type PropsT = {
    totalCount: number | null,
    pageSize: number,
    currentPortion: number,
    currentPage: number,
    followingInProgress: Array<number>,
    users: Array<UserT>,

    setCurrentPage: (currentPage: number) => { type: UsersActionsTypes.SET_CURRENT_PAGE, currentPage: number },
    onPageChanged: () => void,
    changeCurrentPortion: (change: number) => { change: number, type: UsersActionsTypes.CHANGE_CURRENT_PORTION },
    setFollow: (id: number) => Promise<void>
    setUnfollow: (id: number) => Promise<void>
}

const Users: React.FC<PropsT> = (props) => {
    return (
        <div className={s.usersWrapper}>
            <div className={s.usersTopPanel}>
                <Pagination
                    currentPage={props.currentPage}
                    setCurrentPage={props.setCurrentPage}
                    onPageChanged={props.onPageChanged}
                    currentPortion={props.currentPortion}
                    pageSize={props.pageSize}
                    changeCurrentPortion={props.changeCurrentPortion}
                    totalCount={props.totalCount}
                />
                <UsersSearchForm/>
            </div>
            <div className={s.usersList}>
                {
                    props.users.map(user => <User
                        key={user.id}
                        user={user}
                        followingInProgress={props.followingInProgress}
                        setFollow={props.setFollow}
                        setUnfollow={props.setUnfollow}/>
                    )
                }
            </div>
        </div>
    )
}

export default Users