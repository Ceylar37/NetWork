import {FilterT, UsersActionT, UserT} from "../../types/UsersTypes";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {usersAPI} from "../../serverApi/users";
import {Dispatch} from "redux";
import {ResultCodeEnum} from "../../types/RequestTypes";
import {IThunkAPI} from "../../types/GlobalTypes";

export let usersInitialState = {
    users: [] as Array<UserT>,
    pageSize: 10,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>,
    totalCount: 1 as number,
    filter: {
        term: '',
        followed: 'null' as 'followed' | 'unfollowed' | 'null'
    }
}
interface IFollowUnfollow {
    userId: number
}
interface ISetUsers {
    users: Array<UserT>
}
interface ISetCurrentPage {
    currentPage: number
}
interface ISetTotalCount {
    totalCount: number
}
interface ISetFetch {
    isFetching: boolean
}
interface IToggleFollowingProgress {
    isFetching: boolean,
    id: number
}
interface IChangeFilters {
    filter: FilterT
}

const usersSlice = createSlice({
    name: 'usersPage',
    initialState: usersInitialState,
    reducers: {
        follow: (state, action: PayloadAction<IFollowUnfollow>) => {
            debugger
            const user = state.users.find((u) => u.id === action.payload.userId)
            if (user) user.followed = true
        },
        unfollow: (state, action: PayloadAction<IFollowUnfollow>) => {
            debugger
            const user = state.users.find((u) => u.id === action.payload.userId)
            if (user) user.followed = false
        },
        setUsers: (state, action: PayloadAction<ISetUsers>) => {
            state.users = action.payload.users
        },
        setCurrentPage: (state, action: PayloadAction<ISetCurrentPage>) => {
            state.currentPage = action.payload.currentPage
        },
        setTotalCount: (state, action: PayloadAction<ISetTotalCount>) => {
            state.totalCount = action.payload.totalCount
        },
        setFetch: (state, action: PayloadAction<ISetFetch>) => {
            state.isFetching = action.payload.isFetching
        },
        toggleFollowingProgress: (state, action: PayloadAction<IToggleFollowingProgress>) => {
            if (action.payload.isFetching) {
                state.followingInProgress.push(action.payload.id)
            } else {
                state.followingInProgress = state.followingInProgress.filter(id => id !== action.payload.id)
            }
        },
        changeFilters: (state, action: PayloadAction<IChangeFilters>) => {
            state.filter = action.payload.filter
        }
    }
})

export const requestUsers = createAsyncThunk<Promise<void>,
    { currentPage: number, pageSize: number, payload: FilterT },
    IThunkAPI>('users/requestUsers', async ({currentPage, pageSize, payload}, thunkAPI) => {
    const transpiledPayload = transpilePayloadToServerT(payload)
    thunkAPI.dispatch(usersActions.setFetch({isFetching: true}))
    let data = await usersAPI.getUsers(currentPage, pageSize, transpiledPayload.term, transpiledPayload.followed)
    thunkAPI.dispatch(usersActions.setUsers({users: data.items}))
    thunkAPI.dispatch(usersActions.setTotalCount({totalCount: data.totalCount}))
    thunkAPI.dispatch(usersActions.setFetch({isFetching: false}))
})

export const setFollow = createAsyncThunk<Promise<void>,
    number,
    IThunkAPI>('users/setFollow', async (id, thunkAPI) => {
    await _followUnfollowFlow(thunkAPI.dispatch, id, usersAPI.follow.bind(usersAPI), usersActions.follow)
})

export const setUnfollow = createAsyncThunk<Promise<void>,
    number,
    IThunkAPI>('users/setUnfollow', async (id, thunkAPI) => {
    await _followUnfollowFlow(thunkAPI.dispatch, id, usersAPI.unfollow.bind(usersAPI), usersActions.unfollow)
})

const _followUnfollowFlow = async (dispatch: Dispatch<UsersActionT>, id: number, apiMethod: (id: number) => Promise<ResultCodeEnum>, actionCreator: Function) => {
    dispatch(usersActions.toggleFollowingProgress({isFetching: true, id}))
    let resultCode = await apiMethod(id)
    if (resultCode === ResultCodeEnum.Success) {
        dispatch(actionCreator({userId: id}))
    }
    dispatch(usersActions.toggleFollowingProgress({isFetching: false, id}))

}

export const changeFiltersAndRequestUsers = createAsyncThunk<Promise<void>,
    { pageSize: number, filter: FilterT },
    IThunkAPI>('users/changeFiltersAndRequestUsers', async ({filter, pageSize}, thunkAPI) => {
    thunkAPI.dispatch(usersActions.setFetch({isFetching: true}))
    thunkAPI.dispatch(usersActions.changeFilters({filter}))
    thunkAPI.dispatch(usersActions.setCurrentPage({currentPage: 1}))
    const transpiledPayload = transpilePayloadToServerT(filter)
    let data = await usersAPI.getUsers(1, pageSize, transpiledPayload.term, transpiledPayload.followed)
    thunkAPI.dispatch(usersActions.setUsers({users: data.items}))
    thunkAPI.dispatch(usersActions.setTotalCount({totalCount: data.totalCount}))
    thunkAPI.dispatch(usersActions.setFetch({isFetching: false}))
})

const transpilePayloadToServerT = (payload: FilterT) => ({
    term: payload.term,
    followed: payload.followed === 'followed' ? true : payload.followed === 'unfollowed' ? false : null
})

export const usersReducer = usersSlice.reducer
export const usersActions = usersSlice.actions