import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {Provider} from "react-redux"
import {store} from "./store/store"
import {BrowserRouter, Route} from "react-router-dom"
import {QueryParamProvider} from "use-query-params"

ReactDOM.render(
    <BrowserRouter>
        <QueryParamProvider ReactRouterRoute={Route}>
            <Provider store={store}>
                <App/>
            </Provider>
        </QueryParamProvider>
    </BrowserRouter>,

    document.getElementById('root')
)
