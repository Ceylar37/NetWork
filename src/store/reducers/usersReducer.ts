import {FilterT, UsersActionsTypes, UsersActionT, UsersStateT, UsersThunkResultT, UserT} from "../../types/UsersTypes";
import {Dispatch} from "redux";
import {ResultCodeEnum} from "../../types/RequestTypes";
import {Nullable} from "../../types/GlobalTypes";
import {usersAPI} from "../../serverApi/users";

export let usersInitialState = {
    users: [] as Array<UserT>,
    pageSize: 10,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>,
    totalCount: 1 as number,
    filter: {
        term: '',
        followed: null as Nullable<boolean>
    }
}

const usersReducer = (state = usersInitialState, action: UsersActionT): UsersStateT => {
    switch (action.type) {
        case UsersActionsTypes.FOLLOW:
            return {
                ...state,
                users: updateFollowedUsers(state.users, action.payload, true)
            }
        case UsersActionsTypes.UNFOLLOW:
            return {
                ...state,
                users: updateFollowedUsers(state.users, action.payload, false)
            }
        case UsersActionsTypes.SET_USERS:
            return {...state, users: action.payload}
        case UsersActionsTypes.SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload,
            }
        case UsersActionsTypes.SET_TOTAL_COUNT:
            return {...state, totalCount: action.payload}
        case UsersActionsTypes.SET_FETCH:
            return {...state, isFetching: action.payload}
        case UsersActionsTypes.TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.payload.isFetching
                    ? [...state.followingInProgress, action.payload.id]
                    : state.followingInProgress.filter(id => id !== action.payload.id)
            }
        case UsersActionsTypes.CHANGE_FILTER:
            return {
                ...state,
                filter: action.payload
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
    follow: (userId: number) => ({type: UsersActionsTypes.FOLLOW, payload: userId} as const),
    unfollow: (userId: number) => ({type: UsersActionsTypes.UNFOLLOW, payload: userId} as const),
    setUsers: (users: Array<UserT>) => ({type: UsersActionsTypes.SET_USERS, payload: users} as const),
    setCurrentPage: (currentPage: number) => ({type: UsersActionsTypes.SET_CURRENT_PAGE, payload: currentPage} as const),
    setTotalCount: (totalCount: number) => ({type: UsersActionsTypes.SET_TOTAL_COUNT, payload: totalCount} as const),
    setFetch: (isFetching: boolean) => ({type: UsersActionsTypes.SET_FETCH, payload: isFetching} as const),
    toggleFollowingProgress: (isFetching: boolean, id: number) => ({
        type: UsersActionsTypes.TOGGLE_IS_FOLLOWING_PROGRESS,
        payload: {
            isFetching,
            id
        }
    } as const),
    changeFilters: (payload: FilterT) => ({type: UsersActionsTypes.CHANGE_FILTER, payload} as const)
}

export const requestUsers = (currentPage: number, pageSize: number, payload: FilterT): UsersThunkResultT<Promise<void>> =>
    async dispatch => {
        dispatch(usersActions.setFetch(true))
        let data = await usersAPI.getUsers(currentPage, pageSize, payload.term, payload.followed)
        dispatch(usersActions.setUsers(data.items))
        dispatch(usersActions.setTotalCount(data.totalCount))
        dispatch(usersActions.setFetch(false))
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
    }
    dispatch(usersActions.toggleFollowingProgress(false, id))

}

export const changeFiltersAndRequestUsers = (pageSize:number, payload: FilterT): UsersThunkResultT<Promise<void>> =>
    async dispatch => {
        dispatch(usersActions.setFetch(true))
        dispatch(usersActions.changeFilters(payload))
        dispatch(usersActions.setCurrentPage(1))
        let data = await usersAPI.getUsers(1, pageSize, payload.term, payload.followed)
        dispatch(usersActions.setUsers(data.items))
        dispatch(usersActions.setTotalCount(data.totalCount))
        dispatch(usersActions.setFetch(false))
    }

export default usersReducer