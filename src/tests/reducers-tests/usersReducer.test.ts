import {FilterT, UsersStateT} from "../../types/UsersTypes";
import {usersActions, usersReducer} from "../../store/slice-reducers/usersReducer";

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
