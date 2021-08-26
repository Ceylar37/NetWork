import React, {useEffect} from 'react'
import User from "./User/User"
import s from './Users.module.scss'
import Pagination from "../../common/Pagination/Pagination";
import UsersSearchForm from "./UsersSearchForm/UsersSearchForm";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage,
    getCurrentPortion,
    getFilter,
    getFollowingInProgress,
    getIsUsersFetching,
    getPageSize,
    getTotalCount,
    getUsers
} from "../../../selectors/users-selectors";
import {requestUsers, setFollow, setUnfollow, usersActions} from "../../../store/reducers/usersReducer"
import Preloader from "../../common/Preloader/Preloader";
import { useHistory } from 'react-router-dom';
import {useQueryParams, StringParam, BooleanParam, NumberParam} from "use-query-params";
import {stringify} from "querystring";

const Users: React.FC = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    const totalCount = useSelector(getTotalCount)
    const pageSize = useSelector(getPageSize)
    const currentPortion = useSelector(getCurrentPortion)
    const currentPage = useSelector(getCurrentPage)
    const followingInProgress = useSelector(getFollowingInProgress)
    const users = useSelector(getUsers)
    const filter = useSelector(getFilter)
    const isFetching = useSelector(getIsUsersFetching)

    const [query] = useQueryParams({
        term: StringParam,
        friend: BooleanParam,
        page: NumberParam
    })

    useEffect(() => {
        setCurrentPage(query.page ? query.page : 1)
        dispatch(usersActions.changeFilters({followed: query.friend === undefined ? null : query.friend, term: query.term ? query.term : ''}))
        onPageChanged()
        debugger
    }, [])

    useEffect(() => {
        const newQuery: {
            term?: string,
            friend?: boolean,
            page?: number
        } = {}
        if (filter.term !== '') newQuery.term = filter.term
        if (typeof filter.followed === 'boolean') newQuery.friend = filter.followed
        if (currentPage !== 1) newQuery.page = currentPage
       history.push({
           pathname: '/users',
           search: stringify(newQuery)
       })
        debugger
   }, [filter, currentPage])

    const setCurrentPage = (currentPage: number) => {
        dispatch(usersActions.setCurrentPage(currentPage))
    }

    const onPageChanged = () => {
        dispatch(requestUsers(currentPage, pageSize, filter))
    }

    const changeCurrentPortion = (change: number) => {
        dispatch(usersActions.changeCurrentPortion(change))
    }

    const follow = (id: number) => {
        dispatch(setFollow(id))
    }

    const unfollow = (id: number) => {
        dispatch(setUnfollow(id))
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
                <UsersSearchForm filter={filter} currentPage={currentPage} pageSize={pageSize}/>
            </div>
            <div className={s.usersList}>
                {
                    users.map(user => <User
                        key={user.id}
                        user={user}
                        followingInProgress={followingInProgress}
                        setFollow={follow}
                        setUnfollow={unfollow}/>
                    )
                }
            </div>
        </div>}
        </>
    )
}

export default Users