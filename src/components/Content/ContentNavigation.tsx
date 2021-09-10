import React from 'react'
import {Route, Switch} from "react-router-dom"
import {useSelector} from "react-redux"
import {getIsAuthorised} from "../../selectors/auth-selector"
import {privateRoutes, publicRoutes} from "../../router"

const ContentNavigation: React.FC = () => {

    const isAuth = useSelector(getIsAuthorised)

    return (
        <div>
            {isAuth
                ? <Switch>
                    {privateRoutes.map((route) =>
                        <Route
                            path={route.path}
                            exact={route.exact}
                            component={route.component}
                        />)}
                </Switch>
                : <Switch>
                    {publicRoutes.map((route) =>
                        <Route
                            path={route.path}
                            exact={route.exact}
                            component={route.component}
                        />)}
                </Switch>}
        </div>
    )
}

export default ContentNavigation