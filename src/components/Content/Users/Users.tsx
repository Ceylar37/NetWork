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
import {useHistory} from 'react-router-dom';
import {NumberParam, StringParam, useQueryParams} from "use-query-params";
import {stringify} from "querystring";
import {Col, Pagination, Row, Spin} from "antd";
import {withAuthRedirect} from "../../../hoc/WithAuthRedirect";
import MySpin from "../../common/MySpin/MySpin";

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
        friend: StringParam,
        page: NumberParam
    })

    useEffect(() => {
        dispatch(usersActions.setCurrentPage(query.page ? query.page : 1))
        dispatch(usersActions.changeFilters({
            followed: query.friend === undefined ? 'null' : query.friend === 'followed' ? 'followed' : 'unfollowed',
            term: query.term ? query.term : ''
        }))
        dispatch(requestUsers(currentPage, pageSize, filter))
    }, [])

    useEffect(() => {
        const newQuery: {
            term?: string,
            friend?: 'followed' | 'unfollowed',
            page?: number
        } = {}
        if (filter.term) newQuery.term = filter.term
        switch (filter.followed) {
            case "followed":
                newQuery.friend = 'followed'
                break
            case "unfollowed":
                newQuery.friend = 'unfollowed'
        }
        if (currentPage !== 1) newQuery.page = currentPage
        history.push({
            pathname: '/users',
            search: stringify(newQuery)
        })
    }, [filter, currentPage, history])

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
        <Col>
            <Row justify={"space-around"}>
                <Col>{!isFetching
                    ? <Pagination defaultCurrent={currentPage} total={totalCount} onChange={onPageChanged} style={{margin: 'auto'}}/>
                    : <MySpin/>}
                </Col>
                <Col>
                    <UsersSearchForm filter={filter} currentPage={currentPage} pageSize={pageSize}/>
                </Col>
            </Row>
            {!isFetching
                ? <div >
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
                : <MySpin size={'large'} style={{paddingTop: '100px'}}/>}
        </Col>
    )
}

export default withAuthRedirect(Users)