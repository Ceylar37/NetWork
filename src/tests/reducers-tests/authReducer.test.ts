import {AuthStateT} from "../../types/AuthTypes";
import {
    auth,
    authActions,
    authInitialState,
    authReducer,
    getCaptchaURL,
    login,
    logout
} from "../../store/slice-reducers/authReducer";
import {
    getActions, mockResponses,
    mockStore,
    spyAllAPIMethodsAndClearActions
} from "./index";
import {AnyAction} from "redux";

describe('sync actions', () => {

    let state: AuthStateT;

    beforeEach(() => {
        state = authInitialState
    })

    test('setUserData', () => {
        const payload = {id: 1, email: 'aaa', isAuthorised: true, login: 'bbb', photo: 'ccc'}
        state = authReducer(state, authActions.setUserData(payload))

        expect(state.id).toBe(payload.id)
        expect(state.email).toBe(payload.email)
        expect(state.isAuthorised).toBeTruthy()
        expect(state.login).toBe(payload.login)
        expect(state.photo).toBe(payload.photo)
    })

    test('setCaptchaUrl', () => {
        const payload = {url: 'asd'}
        state = authReducer(state, authActions.setCaptchaUrl(payload))

        expect(state.captchaUrl).toBe(payload.url)
    })

    test('setError', () => {
        const payload = {errorMessage: 'asg'}
        state = authReducer(state, authActions.setError(payload))

        expect(state.errorMessage).toBe(payload.errorMessage)
    })
})

describe('async actions', () => {

        beforeEach(() => {
            spyAllAPIMethodsAndClearActions()
    })

    test('auth', async () => {
        await mockStore.dispatch(auth())

        const actions = getActions()
        checkAuth(actions, 0)
    })

    test('getCaptchaURL', async () => {
        await mockStore.dispatch(getCaptchaURL())

        const actions = getActions()
        expect(actions[0].type).toBe(getCaptchaURL.pending.type)
        expect(actions[1]).toEqual(authActions.setCaptchaUrl({url: mockResponses.getCaptchaURL}))
        expect(actions[2].type).toBe(getCaptchaURL.fulfilled.type)
    })

    test('login', async () => {
        const payload = {email: 'asd', captcha: 'gra', password: 'uik', rememberMe: true}
        await mockStore.dispatch(login(payload))

        const actions = getActions()
        expect(actions[0].type).toBe(login.pending.type)
        checkAuth(actions, 1)
        expect(actions[4]).toEqual(authActions.setError({errorMessage: null}))
        expect(actions[5].type).toBe(login.fulfilled.type)
    })

    test('logout', async () => {
        await mockStore.dispatch(logout())

        const actions = getActions()
        expect(actions[0].type).toBe(logout.pending.type)
        expect(actions[1]).toEqual(authActions.setUserData({id: null, photo: null, email: null, isAuthorised: false, login: null}))
        expect(actions[2].type).toBe(logout.fulfilled.type)
    })
})

export const checkAuth = (actions : AnyAction[], i: number) => {
    expect(actions[i].type).toBe(auth.pending.type)
    expect(actions[i+1]).toEqual(authActions.setUserData({id: mockResponses.auth.data.id, login: mockResponses.auth.data.login, isAuthorised: true, email: mockResponses.auth.data.email, photo: mockResponses.getProfileData.photos.large}))
    expect(actions[i+2].type).toBe(auth.fulfilled.type)
}