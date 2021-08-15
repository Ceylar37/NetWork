import React, {useEffect} from 'react'
import {withAuthRedirect} from "../../../hoc/WithAuthRedirect"
import {RootStateT} from "../../../types/GlobalTypes"
import {UserT} from "../../../types/UsersTypes"
import {
    getCurrentPage,
    getCurrentPortion, getFollowingInProgress, getIsUsersFetching,
    getPageSize,
    getTotalCount,
    getUsers
} from "../../../selectors/users-selectors"
import {connect, ConnectedProps} from "react-redux"
import {requestUsers, setFollow, setUnfollow, usersActions} from "../../../store/reducers/usersReducer"
import Preloader from "../../common/Preloader/Preloader"
import Users from "./Users"

type MapStatePropsT = {
    users: Array<UserT>,
    currentPage: number,
    pageSize: number,
    isFetching: boolean,
    totalCount: number | null,
    currentPortion: number,
    followingInProgress: Array<number>,
}

type PropsFromRedux = ConnectedProps<typeof connector>

const UsersContainer:React.FC<PropsFromRedux> = (props) => {

    useEffect(() => {
        onPageChanged()
    }, [props.currentPage])

    const onPageChanged = () => {
        props.requestUsers(props.currentPage, props.pageSize)
    }

    return (
        <>{props.isFetching ? <Preloader/> : <Users
                totalCount={props.totalCount}
                pageSize={props.pageSize}
                currentPage={props.currentPage}
                currentPortion={props.currentPortion}
                followingInProgress={props.followingInProgress}
                users={props.users}
                setCurrentPage={props.setCurrentPage}
                changeCurrentPortion={props.changeCurrentPortion}
                setFollow={props.setFollow}
                setUnfollow={props.setUnfollow}
                onPageChanged={onPageChanged}
            />}
        </>
    )
}

const mapStateToProps = (state: RootStateT): MapStatePropsT => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalCount: getTotalCount(state),
        currentPage: getCurrentPage(state),
        currentPortion: getCurrentPortion(state),
        isFetching: getIsUsersFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }
}

const connector = connect(mapStateToProps, {
    setFollow, setUnfollow, setCurrentPage:usersActions.setCurrentPage, requestUsers, changeCurrentPortion: usersActions.changeCurrentPortion
})

export default withAuthRedirect(connector(UsersContainer))