import React, {useEffect, useState} from 'react';
import {Field} from "react-final-form";
import s from './ProfileInfo.module.scss'
import {ProfileT} from "../../../../types/ProfileTypes";

type PropsT = {
    profile: ProfileT,
    status: string,
    profileDataEditMode: boolean
    submitting: boolean

    updateStatus: (status: string) => Promise<void>
}

const ProfileInfoForm: React.FC<PropsT> = (props) => {

    let [status, editStatus] = useState<string>(props.status)

    useEffect(() => {
        editStatus(props.status)
    }, [props.status])

    return (
        <div className={s.profileInfoWrapper}>
            <Field disabled={props.submitting} className={s.name} name={'fullName'} component={'input'} type={'text'}
                   placeholder={'Login'}/>
            <span>Status: {status}</span>
            <span>About me: <Field disabled={props.submitting} name={'aboutMe'} component={'input'} type={'text'}
                                   placeholder={'About Me'}/></span>
            <span>Looking For A Job: <Field disabled={props.submitting} name={'lookingForAJob'} component={'input'}
                                            type={'checkbox'}/></span>
            <span>Looking for a job description: <Field disabled={props.submitting} name={'lookingForAJobDescription'}
                                                        component={'input'} type={'text'}
                                                        placeholder={'Looking for a job description'}/>
                        </span>
        </div>
    );
};

export default ProfileInfoForm;