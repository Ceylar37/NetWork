import {
    changeFiltersAndRequestUsers,
    requestUsers,
    setFollow,
    setUnfollow,
    usersActions
} from "../../store/slice-reducers/usersReducer";
import {ResultCodeEnum, UsersResponseT} from "../../types/RequestTypes";
import thunk, {ThunkDispatch} from "redux-thunk";
import configureMockStore from "redux-mock-store";
import {RootStateT} from "../../types/GlobalTypes";
import {AnyAction} from "redux";
import {usersAPI} from "../../serverApi/users";
import {FilterT} from "../../types/UsersTypes";

type DispatchExts = ThunkDispatch<RootStateT, void, AnyAction>

const mockStore = configureMockStore<any, DispatchExts>([thunk])
let store = mockStore({})

const getUsersResponse: UsersResponseT = {
    totalCount: 1,
    items: [],
    error: []
}


beforeEach(() => {
    jest.spyOn(usersAPI, 'getUsers').mockResolvedValue(getUsersResponse)
    jest.spyOn(usersAPI, 'follow').mockResolvedValue(ResultCodeEnum.Success)
    jest.spyOn(usersAPI, 'unfollow').mockResolvedValue(ResultCodeEnum.Success)
    store = mockStore({})

})

test('requestUsers', async () => {
    await store.dispatch(requestUsers({pageSize: 2, payload: {followed: 'null', term: ''}, currentPage: 1}))

    const actions: AnyAction[] = store.getActions()
    expect(actions[0].type).toBe(requestUsers.pending.type)
    expect(actions[1]).toEqual(usersActions.setFetch({isFetching: true}))
    expect(actions[2]).toEqual(usersActions.setUsers({users: getUsersResponse.items}))
    expect(actions[3]).toEqual(usersActions.setTotalCount({totalCount: getUsersResponse.totalCount}))
    expect(actions[4]).toEqual(usersActions.setFetch({isFetching: false}))
    expect(actions[5].type).toBe(requestUsers.fulfilled.type)
})

test('setFollow', async () => {
    await store.dispatch(setFollow(1))

    const actions: AnyAction[] = store.getActions()
    expect(actions[0].type).toBe(setFollow.pending.type)
    expect(actions[1]).toEqual(usersActions.toggleFollowingProgress({isFetching: true, id: 1}))
    expect(actions[2]).toEqual(usersActions.follow({userId: 1}))
    expect(actions[3]).toEqual(usersActions.toggleFollowingProgress({isFetching: false, id: 1}))
    expect(actions[4].type).toBe(setFollow.fulfilled.type)
})

test('setUnfollow', async () => {
    await store.dispatch(setUnfollow(1))

    const actions: AnyAction[] = store.getActions()
    expect(actions[0].type).toBe(setUnfollow.pending.type)
    expect(actions[1]).toEqual(usersActions.toggleFollowingProgress({isFetching: true, id: 1}))
    expect(actions[2]).toEqual(usersActions.unfollow({userId: 1}))
    expect(actions[3]).toEqual(usersActions.toggleFollowingProgress({isFetching: false, id: 1}))
    expect(actions[4].type).toBe(setUnfollow.fulfilled.type)
})

test('changeFiltersAndRequestUsers', async () => {
    const pageSize = 3
    const filter: FilterT = {term: 'aa', followed: 'followed'}
    await store.dispatch(changeFiltersAndRequestUsers({pageSize, filter}))

    const actions: AnyAction[] = store.getActions()
    expect(actions[0].type).toBe(changeFiltersAndRequestUsers.pending.type)
    expect(actions[1]).toEqual(usersActions.setFetch({isFetching: true}))
    expect(actions[2]).toEqual(usersActions.changeFilters({filter}))
    expect(actions[3]).toEqual(usersActions.setCurrentPage({currentPage: 1}))
    expect(actions[4]).toEqual(usersActions.setUsers({users: getUsersResponse.items}))
    expect(actions[5]).toEqual(usersActions.setTotalCount({totalCount: getUsersResponse.totalCount}))
    expect(actions[6]).toEqual(usersActions.setFetch({isFetching: false}))
    expect(actions[7].type).toBe(changeFiltersAndRequestUsers.fulfilled.type)
})