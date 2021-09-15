import React, {useEffect, useState} from 'react';
import s from './ProfileInfo.module.scss'
import {ProfileT} from "../../../../types/ProfileTypes";
import {Checkbox, Form, Input} from "antd";
import {Nullable} from "../../../../types/GlobalTypes";
import Status from "../../../common/Status/Status";

type PropsT = {
    profile: ProfileT,
    status: string,
    profileDataEditMode: boolean
    submitting: boolean
    fullName: Nullable<string>,
    aboutMe: Nullable<string>,
    lookingForAJob: Nullable<boolean>,
    lookingForAJobDescription: Nullable<string>
    isOwner: boolean

    updateStatus: (status: string) => void
}

const ProfileInfoForm: React.FC<PropsT> = (props) => {

    let [status, editStatus] = useState<string>(props.status)

    useEffect(() => {
        editStatus(props.status)
    }, [props.status])

    return (
        <div className={s.profileInfoWrapper}>
            <Form.Item label={'Login:'} initialValue={props.fullName} name={'fullName'}>
                <Input disabled={props.submitting} placeholder={'Login'}/>
            </Form.Item>
            <Status isOwner={props.isOwner}/>
                <Form.Item label={'About me:'} initialValue={props.aboutMe} name={'aboutMe'}>
                    <Input disabled={props.submitting} placeholder={'About Me'}/>
                </Form.Item>
            <Form.Item initialValue={props.lookingForAJob} name={'lookingForAJob'} valuePropName="checked">
                <Checkbox>Looking for a job</Checkbox>
            </Form.Item>
                <Form.Item label={'Looking for a job description:'} initialValue={props.lookingForAJobDescription} name={'lookingForAJobDescription'}>
                    <Input disabled={props.submitting} placeholder={'Looking for a job description'}/>
                </Form.Item>
        </div>
    );
};

export default ProfileInfoForm;