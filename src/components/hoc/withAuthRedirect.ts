import React from "react";
import {RootStateT} from "../../types/GlobalTypes";
import {connect} from "react-redux";

const withAuthRedirect = (Component: React.Component) => {
    /*class RedirectComponent extends React.Component {
        render() {
            if (!this.props.isAuthorised) return <Redirect to={'/login'}/>

            return <Component {...this.props}/>
        }
    }

    let mapStateToProps = (state: GlobalStateT) => {
        return {
            isAuthorised: state.auth.isAuthorised,
        }
    }


    return connect(mapStateToProps)(RedirectComponent);*/
}