import React from 'react';
import {ProfileT} from "../../../../types/ProfileTypes";
import s from './ProfileInfo.module.scss'
import {Checkbox} from "antd";
import Status from "../../../common/Status";

type PropsT = {
    profile: ProfileT,
    status: string,
    profileDataEditMode: boolean,
    isOwner: boolean

    updateStatus: (status: string) => void
}

const ProfileInfo: React.FC<PropsT> = (props) => {

        return (
            <div className={s.profileInfoWrapper}>
                <span className={s.name}>{props.profile.fullName}</span>
                <Status isOwner={props.isOwner}/>
                <span>About me: {props.profile.aboutMe}</span>
                <span>Looking for a job : {props.profile.lookingForAJob
                    ? <Checkbox checked disabled/>
                    : <Checkbox disabled/>}
                </span>
                <span>Looking for a job description: {props.profile.lookingForAJobDescription}</span>
            </div>
        )
}

export default ProfileInfo