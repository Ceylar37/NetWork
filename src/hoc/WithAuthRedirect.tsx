import React from "react";
import { Redirect } from 'react-router'
import {connect, ConnectedProps} from "react-redux";
import {RootStateT} from "../types/GlobalTypes";

type MapStatePropsT = {
    isAuthorised: boolean
}
type MapDispatchPropsT = {}

export function withAuthRedirect<T> (Component: React.ComponentType<T>) {
    const RedirectComponent: React.FC<MapStatePropsT & MapDispatchPropsT> = (props) => {
        const {isAuthorised, ...restProps} = props
        if (!props.isAuthorised) return <Redirect to={'/login'}/>

        return <Component {...restProps as T}/>
    }

    return connector(RedirectComponent);
}

let mapStateToProps = (state: RootStateT) => {
    return {
        isAuthorised: state.auth.isAuthorised,
    }
}

const connector = connect(mapStateToProps, {})