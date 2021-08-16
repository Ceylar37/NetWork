import {UsersActionsTypes, UsersActionT, UsersStateT, UsersThunkResultT, UserT} from "../../types/UsersTypes";
import {Dispatch} from "redux";
import {usersAPI} from "../../serverApi/serverApi";
import {ResultCodeEnum} from "../../types/RequestTypes";

export let usersInitialState = {
    users: [] as Array<UserT>,
    pageSize: 50,
    currentPage: 1,
    currentPortion: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>,
    totalCount: null as number | null,
}

const usersReducer = (state = usersInitialState, action: UsersActionT): UsersStateT => {
    switch (action.type) {
        case UsersActionsTypes.FOLLOW:
            return {
                ...state,
                users: updateFollowedUsers(state.users, action.userId, true)
            }
        case UsersActionsTypes.UNFOLLOW:
            return {
                ...state,
                users: updateFollowedUsers(state.users, action.userId, false)
            }
        case UsersActionsTypes.SET_USERS:
            return {...state, users: action.users}
        case UsersActionsTypes.SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage,
            }
        case UsersActionsTypes.SET_TOTAL_COUNT:
            return {...state, totalCount: action.totalCount}
        case UsersActionsTypes.SET_FETCH:
            return {...state, isFetching: action.isFetching}
        case UsersActionsTypes.TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.id]
                    : state.followingInProgress.filter(id => id !== action.id)
            }
        case UsersActionsTypes.CHANGE_CURRENT_PORTION:
            return {
                ...state,
                currentPortion: state.currentPortion + action.change,
            }
        default:
            return state
    }
}

const updateFollowedUsers = (users: Array<UserT>, userId: number, isFollowing: boolean): Array<UserT> => users.map((user: UserT): UserT => {
    if (user.id === userId) {
        return {...user, followed: isFollowing,}
    } else {
        return user
    }
})

export const usersActions = {
    follow: (userId: number) => ({type: UsersActionsTypes.FOLLOW, userId: userId} as const),
    unfollow: (userId: number) => ({type: UsersActionsTypes.UNFOLLOW, userId: userId} as const),
    setUsers: (users: Array<UserT>) => ({type: UsersActionsTypes.SET_USERS, users} as const),
    setCurrentPage: (currentPage: number) => ({type: UsersActionsTypes.SET_CURRENT_PAGE, currentPage} as const),
    setTotalCount: (totalCount: number) => ({type: UsersActionsTypes.SET_TOTAL_COUNT, totalCount} as const),
    setFetch: (isFetching: boolean) => ({type: UsersActionsTypes.SET_FETCH, isFetching} as const),
    toggleFollowingProgress: (isFetching: boolean, id: number) => ({
        type: UsersActionsTypes.TOGGLE_IS_FOLLOWING_PROGRESS,
        isFetching,
        id
    } as const),
    changeCurrentPortion: (change: number) => ({type: UsersActionsTypes.CHANGE_CURRENT_PORTION, change} as const)
}

export const requestUsers = (currentPage: number, pageSize: number): UsersThunkResultT<Promise<void>> =>
    async dispatch => {
        dispatch(usersActions.setFetch(true))
        let data = await usersAPI.getUsers(currentPage, pageSize)
        dispatch(usersActions.setFetch(false))
        dispatch(usersActions.setUsers(data.items))
        dispatch(usersActions.setTotalCount(data.totalCount))
    }

export const setFollow = (id: number): UsersThunkResultT<Promise<void>> =>
    async dispatch => {
        await _followUnfollowFlow(dispatch, id, usersAPI.follow.bind(usersAPI), usersActions.follow)
    }

export const setUnfollow = (id: number): UsersThunkResultT<Promise<void>> =>
    async dispatch => {
        await _followUnfollowFlow(dispatch, id, usersAPI.unfollow.bind(usersAPI), usersActions.unfollow)
    }


const _followUnfollowFlow = async (dispatch: Dispatch<UsersActionT>, id: number, apiMethod: (id: number) => Promise<ResultCodeEnum>, actionCreator: Function) => {
    dispatch(usersActions.toggleFollowingProgress(true, id))
    let resultCode = await apiMethod(id)
    if (resultCode === ResultCodeEnum.Success) {
        dispatch(actionCreator(id))
        dispatch(usersActions.toggleFollowingProgress(false, id))
    }
}

export default usersReducer