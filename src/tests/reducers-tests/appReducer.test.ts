import {AppStateT} from "../../types/AppTypes";
import {appActions, appReducer, initializeApp} from "../../store/slice-reducers/appReducer";
import {getActions, mockStore, spyAllAPIMethodsAndClearActions} from "./index";
import {checkAuth} from "./authReducer.test";

let state: AppStateT


describe('sync actions', () => {
    
    beforeEach(() => {
        state = {
            initialized: false
        }
    })

    test('initApp', () => {
        state = appReducer(state, appActions.initApp())
        expect(state.initialized).toBeTruthy()
    })
})

describe('async actions', () => {
    beforeEach(() => {
        spyAllAPIMethodsAndClearActions()
    })

    test('initializeApp', async () => {

        await mockStore.dispatch(initializeApp())

        const actions = getActions()
        expect(actions[0].type).toBe(initializeApp.pending.type)
        checkAuth(actions, 1)
        expect(actions[4]).toEqual(appActions.initApp())
        expect(actions[5].type).toBe(initializeApp.fulfilled.type)
    })
})

