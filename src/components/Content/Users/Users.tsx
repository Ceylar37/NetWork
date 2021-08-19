import React, {useEffect} from 'react'
import {FilterT} from "../../../types/UsersTypes"
import User from "./User/User"
import s from './Users.module.scss'
import Pagination from "../../common/Pagination/Pagination";
import UsersSearchForm from "./UsersSearchForm/UsersSearchForm";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage,
    getCurrentPortion, getFilter,
    getFollowingInProgress, getIsUsersFetching,
    getPageSize,
    getTotalCount, getUsers
} from "../../../selectors/users-selectors";
import {
    changeFiltersAndRequestUsers,
    requestUsers,
    setFollow,
    setUnfollow,
    usersActions
} from "../../../store/reducers/usersReducer"
import Preloader from "../../common/Preloader/Preloader";

type PropsT = {
}

const Users: React.FC<PropsT> = (props) => {

    const dispatch = useDispatch()

    const totalCount = useSelector(getTotalCount)
    const pageSize = useSelector(getPageSize)
    const currentPortion = useSelector(getCurrentPortion)
    const currentPage = useSelector(getCurrentPage)
    const followingInProgress = useSelector(getFollowingInProgress)
    const users = useSelector(getUsers)
    const filter = useSelector(getFilter)
    const isFetching = useSelector(getIsUsersFetching)

    useEffect(() => {
        onPageChanged()
    }, [currentPage])

    const setCurrentPage = (currentPage: number) => {
        dispatch(usersActions.setCurrentPage(currentPage))
    }

    const onPageChanged = () => {
        dispatch(requestUsers(currentPage, pageSize, filter))
    }

    const changeCurrentPortion = (change: number) => {
        dispatch(usersActions.changeCurrentPortion(change))
    }

    const setFollow = (id: number) => {
        dispatch(setFollow(id))
    }

    const setUnfollow = (id: number) => {
        dispatch(setUnfollow(id))
    }

    const changeFiltersAndRequestUsers = (pageSize: number, payload: FilterT) => {
        dispatch(changeFiltersAndRequestUsers(pageSize, payload))
    }

    return (
        <>{isFetching ? <Preloader/> :
        <div className={s.usersWrapper}>
            <div className={s.usersTopPanel}>
                <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    onPageChanged={onPageChanged}
                    currentPortion={currentPortion}
                    pageSize={pageSize}
                    changeCurrentPortion={changeCurrentPortion}
                    totalCount={totalCount}
                />
                <UsersSearchForm currentPage={currentPage} pageSize={pageSize}
                                 changeFiltersAndRequestUsers={changeFiltersAndRequestUsers}/>
            </div>
            <div className={s.usersList}>
                {
                    users.map(user => <User
                        key={user.id}
                        user={user}
                        followingInProgress={followingInProgress}
                        setFollow={setFollow}
                        setUnfollow={setUnfollow}/>
                    )
                }
            </div>
        </div>}
        </>
    )
}

export default Users