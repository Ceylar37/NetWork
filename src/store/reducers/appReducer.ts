import {AppActionsType, AppActionT, AppStateT, AppThunkResult} from "../../types/AppTypes";
import {auth} from "./authReducer";

export let appInitialState = {
    initialized: false
}

const appReducer = (state = appInitialState, action: AppActionT): AppStateT => {
    switch (action.type) {
        case AppActionsType.INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true,
            }
        default:
            return state;
    }
}

export const appActions = {
    initializedSuccess: () => ({type: AppActionsType.INITIALIZED_SUCCESS})
}

export const initializeApp = ():AppThunkResult<Promise<void>>  => async dispatch => {
    await dispatch(auth())
    dispatch(appActions.initializedSuccess());
}

export default appReducer;