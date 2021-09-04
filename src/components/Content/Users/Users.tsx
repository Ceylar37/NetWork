import React, {useEffect} from 'react'
import User from "./User/User"
import s from './Users.module.scss'
import UsersSearchForm from "./UsersSearchForm/UsersSearchForm";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage,
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
import {Pagination} from "antd";
import {withAuthRedirect} from "../../../hoc/WithAuthRedirect";

const Users: React.FC = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    const totalCount = useSelector(getTotalCount)
    const pageSize = useSelector(getPageSize)
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
        dispatch(usersActions.setCurrentPage(query.page ? query.page : 1))
        dispatch(usersActions.changeFilters({followed: query.friend === undefined ? null : query.friend, term: query.term ? query.term : ''}))
        dispatch(requestUsers(currentPage, pageSize, filter))
    }, [])

    useEffect(() => {
        const newQuery: {
            term?: string,
            friend?: boolean,
            page?: number
        } = {}
        if (filter.term) newQuery.term = filter.term
        if (typeof filter.followed === 'boolean') newQuery.friend = filter.followed
        if (currentPage !== 1) newQuery.page = currentPage
       history.push({
           pathname: '/users',
           search: stringify(newQuery)
       })
   }, [filter, currentPage])

    const onPageChanged = (page: number) => {
        dispatch(usersActions.setCurrentPage(page))
        dispatch(requestUsers(page, 10, filter))
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
                <Pagination defaultCurrent={currentPage} total={totalCount} onChange={onPageChanged}/>
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

export default withAuthRedirect(Users)