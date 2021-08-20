import React, {useEffect} from 'react';
import {connect, ConnectedProps} from "react-redux";
import {RootStateT} from "../../../types/GlobalTypes";
import {getIsProfileFetching, getProfile, getStatus} from "../../../selectors/profile-selectors";
import {getMyId} from "../../../selectors/auth-selector";
import {
    requestStatus,
    setProfileData,
    updateProfileInfo,
    updateProfilePhoto,
    updateStatus
} from "../../../store/reducers/profileReducer";
import {RouteComponentProps, withRouter} from "react-router";
import Profile from "./Profile";
import Preloader from "../../common/Preloader/Preloader";
import {withAuthRedirect} from "../../../hoc/WithAuthRedirect";

type PropsFromRedux = ConnectedProps<typeof connector>

type PropsT = OwnPropsT & PropsFromRedux & RouteComponentProps<ReactRouterParams>

type OwnPropsT = {}

type ReactRouterParams = {
    userId: string
}

const ProfileContainer: React.FC<PropsT> = (props) => {
    const refreshProfile = () => {
        let userId: number | null = Number(props.match.params.userId) || props.me;
        if (userId) {
            props.setProfileData(userId);
            props.requestStatus(userId);
        }
    }

    useEffect(() => {
        refreshProfile();
    }, [props.match.params.userId])

    return (
        <div>
            {!props.isFetching
                ? <Profile profile={props.profile} status={props.status} updateStatus={props.updateStatus} isOwner={!props.match.params.userId}
                updateProfileInfo={props.updateProfileInfo} updateProfilePhoto={props.updateProfilePhoto}/>
                : <Preloader/>}
        </div>
    )
}

const connector = connect((state: RootStateT) => ({
    profile: getProfile(state),
    isFetching: getIsProfileFetching(state),
    status: getStatus(state),
    me: getMyId(state),
}), {
    setProfileData,
    requestStatus, updateStatus,
    updateProfilePhoto, updateProfileInfo
})

export default withAuthRedirect(withRouter(connector(ProfileContainer)))