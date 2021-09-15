import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {auth} from "./authReducer";
import {IThunkAPI} from "../../types/GlobalTypes";

export let appInitialState = {
    initialized: false
}

const appSlice = createSlice({
    name: 'app',
    initialState: appInitialState,
    reducers: {
        initApp: (state) => {
            state.initialized = true
        }
    }
})

export const initializeApp = createAsyncThunk<
    Promise<void>,
    void,
    IThunkAPI>('app/initializeApp', async (arg, thunkAPI) => {
    await thunkAPI.dispatch(auth())
    thunkAPI.dispatch(appActions.initApp())
})

export const appReducer = appSlice.reducer
export const appActions = appSlice.actions
