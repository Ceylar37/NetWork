import React from 'react';
import Header from "./Header";
import {Nullable, RootStateT} from "../../types/GlobalTypes";
import {getProfileImg} from "../../selectors/profile-selectors";
import {connect, ConnectedProps} from "react-redux";
import {logout} from "../../store/reducers/authReducer";
import {getIsAuthorised} from "../../selectors/auth-selector";

type MapStatePropsT = {
    profileImg: Nullable<string>
    isAuthorised: boolean
}

type PropsFromRedux = ConnectedProps<typeof connector>

const HeaderContainer: React.FC<PropsFromRedux> = (props) => {
    return <Header profileImg={props.profileImg} logout={props.logout} isAuthorised={props.isAuthorised}/>
}

const mapStateToProps = (state: RootStateT): MapStatePropsT => ({
    profileImg: getProfileImg(state),
    isAuthorised: getIsAuthorised(state)
})

const connector = connect(mapStateToProps, {logout})

export default connector(HeaderContainer)