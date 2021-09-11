import {UsersStateT} from "../../types/UsersTypes";
import usersReducer, {usersActions} from "./usersReducer";

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

test('Follow/Unfollow Test', () => {

    let newState = usersReducer(state, usersActions.follow(1))
    newState = usersReducer(newState, usersActions.unfollow(3))

    expect(newState.users[0].followed).toBeTruthy()
    expect(newState.users[1].followed).toBeTruthy()
    expect(newState.users[2].followed).toBeFalsy()
    expect(newState.users[3].followed).toBeFalsy()

});


