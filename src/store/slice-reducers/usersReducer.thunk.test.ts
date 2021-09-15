import {ResultCodeEnum, UsersResponseT} from "../../types/RequestTypes";
import {usersAPI} from "../../serverApi/users";
import {
    changeFiltersAndRequestUsers,
    requestUsers,
    setFollow,
    setUnfollow,
    usersActions
} from "./usersReducer";


jest.mock('../../serverApi/serverApi')
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;

const dispatchMock = jest.fn();
const getStateMock = jest.fn();

beforeEach(() => {
    dispatchMock.mockClear();
    getStateMock.mockClear();
})

const result: UsersResponseT = {
    error: [],
    items: [
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
    totalCount: 100
}

test('setFollow Test', async () => {
    const thunk = setFollow(1)
    usersAPIMock.follow.mockReturnValue(Promise.resolve(ResultCodeEnum.Success));
    usersAPIMock.follow.mockReturnValue(Promise.resolve(ResultCodeEnum.Success));

    await thunk(dispatchMock, getStateMock, undefined)

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, usersActions.toggleFollowingProgress({isFetching: true, id: 1}))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, usersActions.follow({userId: 1}))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, usersActions.toggleFollowingProgress({isFetching: false, id: 1}))
})

test('setUnfollow Test', async () => {
    const thunk = setUnfollow(1)
    usersAPIMock.unfollow.mockReturnValue(Promise.resolve(ResultCodeEnum.Success))

    await thunk(dispatchMock, getStateMock, undefined)

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, usersActions.toggleFollowingProgress({isFetching: true, id: 1}))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, usersActions.unfollow({userId: 1}))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, usersActions.toggleFollowingProgress({isFetching: false, id: 1}))

})

test('requestUsers Test', async () => {
    const thunk = requestUsers(1, 4, {
        term: '',
        followed: 'null'
    })

    usersAPIMock.getUsers.mockResolvedValue(result)

    await thunk(dispatchMock, getStateMock, undefined)

    expect(dispatchMock).toBeCalledTimes(4)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, usersActions.setFetch({isFetching: true}))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, usersActions.setUsers({users: result.items}))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, usersActions.setTotalCount({totalCount: result.totalCount}))
    expect(dispatchMock).toHaveBeenNthCalledWith(4, usersActions.setFetch({isFetching: false}))
})

test('changeFiltersAndRequestUsers Test', async () => {
    const thunk = changeFiltersAndRequestUsers(4, {
        term: '',
        followed: 'null'
    })
    usersAPIMock.getUsers.mockResolvedValue(result)

    await thunk(dispatchMock, getStateMock, undefined)

    expect(dispatchMock).toBeCalledTimes(6)
})