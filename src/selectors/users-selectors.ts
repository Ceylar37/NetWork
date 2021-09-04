import {RootStateT} from "../types/GlobalTypes";
import {FilterT} from "../types/UsersTypes";

export const getUsers = (state: RootStateT) => {
    return state.usersPage.users
}

export const getPageSize = (state: RootStateT): number => {
    return state.usersPage.pageSize
}

export const getTotalCount = (state: RootStateT): number => {
    return state.usersPage.totalCount
}

export const getCurrentPage = (state: RootStateT): number => {
    return state.usersPage.currentPage
}

export const getIsUsersFetching = (state: RootStateT): boolean => {
    return state.usersPage.isFetching
}

export const getFollowingInProgress = (state: RootStateT): Array<number> => {
    return state.usersPage.followingInProgress
}

export const getFilter = (state: RootStateT): FilterT => {
    return state.usersPage.filter
}