import {FilterT, UsersStateT} from "../../types/UsersTypes";
import {
    changeFiltersAndRequestUsers,
    requestUsers,
    setFollow,
    setUnfollow,
    usersActions,
    usersReducer
} from "../../store/slice-reducers/usersReducer";
import {AnyAction} from "redux";
import {getActions, mockResponses, mockStore, spyAllAPIMethodsAndClearActions} from "./index";

describe('sync actions', () => {
    let state: UsersStateT;
    beforeEach(() => {
        state = {
            users: [
                {
                    name: '0',
                    id: 0,
                    photos: {large: 'largePhoto1', small: 'null'},
                    status: 'status1', followed: true
                },
                {
                    name: '1',
                    id: 1,
                    photos: {large: 'largePhoto2', small: 'null'},
                    status: 'status2', followed: false
                },
                {
                    name: '2',
                    id: 2,
                    photos: {large: 'largePhoto3', small: 'smallPhoto3'},
                    status: 'status3', followed: false
                },
                {
                    name: '3',
                    id: 3,
                    photos: {large: 'largePhoto', small: 'null'},
                    status: 'status', followed: true
                }
            ],
            pageSize: 10,
            currentPage: 1,
            isFetching: false,
            followingInProgress: [],
            totalCount: 1,
            filter: {
                term: '',
                followed: 'null' as "null" | "followed" | "unfollowed"
            }
        }
    })

    test('Follow/Unfollow', () => {

        let newState = usersReducer(state, usersActions.follow({userId: 1}))
        newState = usersReducer(newState, usersActions.unfollow({userId: 3}))
        expect(newState.users[0].followed).toBeTruthy()
        expect(newState.users[1].followed).toBeTruthy()
        expect(newState.users[2].followed).toBeFalsy()
        expect(newState.users[3].followed).toBeFalsy()
    });

    test('setUsers', () => {
        const newUsers = [
            {
                name: '4',
                id: 4,
                photos: {large: 'largePhoto4', small: 'null'},
                status: 'status4', followed: true
            },
            {
                name: '5',
                id: 5,
                photos: {large: 'largePhoto5', small: 'null'},
                status: 'status5', followed: false
            },
            {
                name: '6',
                id: 6,
                photos: {large: 'largePhoto6', small: 'smallPhoto6'},
                status: 'status6', followed: true
            },
            {
                name: '7',
                id: 7,
                photos: {large: 'largePhoto7', small: 'null'},
                status: 'status7', followed: false
            }]
        state = usersReducer(state, usersActions
            .setUsers({
                users: newUsers
            }))
        expect(state.users).toEqual(newUsers)
    })

    test('setCurrentPage', () => {
        state = usersReducer(state, usersActions.setCurrentPage({currentPage: 89}))
        expect(state.currentPage).toEqual(89)
        state = usersReducer(state, usersActions.setCurrentPage({currentPage: 2}))
        expect(state.currentPage).toEqual(2)
    })

    test('setTotalCount', () => {
        state = usersReducer(state, usersActions.setTotalCount({totalCount: 15}))
        expect(state.totalCount).toEqual(15)
        state = usersReducer(state, usersActions.setTotalCount({totalCount: 4}))
        expect(state.totalCount).toEqual(4)
    })

    test('setFetch', () => {
        state = usersReducer(state, usersActions.setFetch({isFetching: true}))
        expect(state.isFetching).toBeTruthy()
        state = usersReducer(state, usersActions.setFetch({isFetching: false}))
        expect(state.isFetching).toBeFalsy()
    })

    test('toggleFollowingProgress', () => {
        state = usersReducer(state, usersActions.toggleFollowingProgress({id: 2, isFetching: true}))
        expect(state.followingInProgress.find(id => id === 2)).toBeTruthy()
        expect(state.followingInProgress.length).toEqual(1)
        state = usersReducer(state, usersActions.toggleFollowingProgress({id: 19, isFetching: true}))
        expect(state.followingInProgress.every(id => id === 2 || id === 19)).toBeTruthy()
        expect(state.followingInProgress.length).toEqual(2)
        state = usersReducer(state, usersActions.toggleFollowingProgress({id: 2, isFetching: false}))
        expect(state.followingInProgress.find(id => id === 19)).toBeTruthy()
        expect(state.followingInProgress.length).toEqual(1)
    })

    test('changeFilters', () => {
        let newFilter: FilterT = {followed: 'followed', term: 'aaa'}
        state = usersReducer(state, usersActions.changeFilters({filter: newFilter}))
        expect(state.filter === newFilter).toBeTruthy()
    })
})

describe('async actions', () => {

    beforeEach(() => {
        spyAllAPIMethodsAndClearActions()
    })

    test('requestUsers', async () => {
        await mockStore.dispatch(requestUsers({pageSize: 2, payload: {followed: 'null', term: ''}, currentPage: 1}))

        const actions = getActions()
        expect(actions[0].type).toBe(requestUsers.pending.type)
        expect(actions[1]).toEqual(usersActions.setFetch({isFetching: true}))
        expect(actions[2]).toEqual(usersActions.setUsers({users: mockResponses.getUsers.items}))
        expect(actions[3]).toEqual(usersActions.setTotalCount({totalCount: mockResponses.getUsers.totalCount}))
        expect(actions[4]).toEqual(usersActions.setFetch({isFetching: false}))
        expect(actions[5].type).toBe(requestUsers.fulfilled.type)
    })

    test('setFollow', async () => {
        await mockStore.dispatch(setFollow(1))

        const actions = getActions()
        expect(actions[0].type).toBe(setFollow.pending.type)
        expect(actions[1]).toEqual(usersActions.toggleFollowingProgress({isFetching: true, id: 1}))
        expect(actions[2]).toEqual(usersActions.follow({userId: 1}))
        expect(actions[3]).toEqual(usersActions.toggleFollowingProgress({isFetching: false, id: 1}))
        expect(actions[4].type).toBe(setFollow.fulfilled.type)
    })

    test('setUnfollow', async () => {
        await mockStore.dispatch(setUnfollow(1))

        const actions = getActions()
        expect(actions[0].type).toBe(setUnfollow.pending.type)
        expect(actions[1]).toEqual(usersActions.toggleFollowingProgress({isFetching: true, id: 1}))
        expect(actions[2]).toEqual(usersActions.unfollow({userId: 1}))
        expect(actions[3]).toEqual(usersActions.toggleFollowingProgress({isFetching: false, id: 1}))
        expect(actions[4].type).toBe(setUnfollow.fulfilled.type)
    })

    test('changeFiltersAndRequestUsers', async () => {
        const pageSize = 3
        const filter: FilterT = {term: 'aa', followed: 'followed'}
        await mockStore.dispatch(changeFiltersAndRequestUsers({pageSize, filter}))

        const actions = getActions()
        expect(actions[0].type).toBe(changeFiltersAndRequestUsers.pending.type)
        expect(actions[1]).toEqual(usersActions.setFetch({isFetching: true}))
        expect(actions[2]).toEqual(usersActions.changeFilters({filter}))
        expect(actions[3]).toEqual(usersActions.setCurrentPage({currentPage: 1}))
        expect(actions[4]).toEqual(usersActions.setUsers({users: mockResponses.getUsers.items}))
        expect(actions[5]).toEqual(usersActions.setTotalCount({totalCount: mockResponses.getUsers.totalCount}))
        expect(actions[6]).toEqual(usersActions.setFetch({isFetching: false}))
        expect(actions[7].type).toBe(changeFiltersAndRequestUsers.fulfilled.type)
    })
})