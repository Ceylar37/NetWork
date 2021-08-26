import React, {useEffect, useState} from 'react';
import {ProfileT} from "../../../../types/ProfileTypes";
import s from './ProfileInfo.module.scss'
import {Checkbox} from "antd";

type PropsT = {
    profile: ProfileT,
    status: string,
    profileDataEditMode: boolean,
    isOwner: boolean

    updateStatus: (status: string) => void
}

const ProfileInfo: React.FC<PropsT> = (props) => {

    let [status, editStatus] = useState<string>(props.status)
    let [statusEditMode, toggleStatusEditMode] = useState<boolean>(false)

    useEffect(() => {
        editStatus(props.status)
    }, [props.status])

    const onStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        editStatus(e.currentTarget.value)
    }

    const onStatusInputBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
        if (status !== props.status) {
            e.currentTarget.disabled = true
            await props.updateStatus(status)
            toggleStatusEditMode(false)
        } else {
            toggleStatusEditMode(false)
        }
    }

        return (
            <div className={s.profileInfoWrapper}>
                <span className={s.name}>{props.profile.fullName}</span>
                {props.isOwner ? (!statusEditMode ? <span onDoubleClick={() => {
                        toggleStatusEditMode(true)
                    }}>Status: {status}</span> :
                    <input autoFocus={true} onChange={onStatusChange} onBlur={onStatusInputBlur} type="text"
                           value={status}/>)
                    : <span>Status: {status}</span>
                }
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