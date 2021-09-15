import React, {useCallback, useEffect, useRef, useState} from 'react'
import {ContactsT, ProfileT} from "../../../types/ProfileTypes"
import s from './Profile.module.scss'
import ProfileInfo from "./ProfileInfo/ProfileInfo"
import Contacts from "./Contacts/Contacts"
import ProfileInfoForm from "./ProfileInfo/ProfileInfoForm"
import ContactsForm from "./Contacts/ContactsForm"
import {useDispatch, useSelector} from "react-redux";
import {
    getProfile,
    getProfileErrorMessages,
    getProfileIsFetching,
    getStatus
} from "../../../selectors/profile-selectors";

import {getMyId} from "../../../selectors/auth-selector";
import {useHistory} from 'react-router-dom'
import {Button, Col, Form, Row} from "antd";
import MyAvatar from "../../common/Avatar/MyAvatar";
import MySpin from "../../common/MySpin/MySpin";
import {
    requestStatus,
    setProfileData, updateProfileInfo,
    updateProfilePhoto,
    updateStatus
} from "../../../store/slice-reducers/profileReducer";

type ValueT = {
    aboutMe: string,
    lookingForAJob: boolean | undefined,
    lookingForAJobDescription: string,
    fullName: string
} & ContactsT

const Profile: React.FC = () => {

    const history = useHistory()
    const isOwner = !history.location.pathname.substr(9)
    const dispatch = useDispatch()
    const isFetching = useSelector(getProfileIsFetching)
    const profile = useSelector(getProfile)
    const status = useSelector(getStatus)
    const errorMessages = useSelector(getProfileErrorMessages)
    const me = useSelector(getMyId)

    const [submitting, editSubmitting] = useState<boolean>(false)
    const [isProfilePhotoUpdating, editIsProfilePhotoUpdating] = useState<boolean>(false)
    const [isProfileDataEditModeOn, toggleProfileDataEditMode] = useState<boolean>(false)
    const inpRef = useRef<HTMLInputElement>(null)

    const imitateClickOnInp = () => {
        if (inpRef.current) {
            inpRef.current.click()
        }
    }

    const onProfilePhotoSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target?.files?.length) {
            editIsProfilePhotoUpdating(true)
            await dispatch(updateProfilePhoto(e.target.files[0]))
            editIsProfilePhotoUpdating(false)
        }
    }

    const updateStatusWrapper = (status: string) => {
        dispatch(updateStatus(status))
    }

    const refreshProfile = useCallback(() => {
        const userId: number | null = Number(history.location.pathname.substr(9)) || me;
        if (userId) {
            dispatch(setProfileData(userId))
            dispatch(requestStatus(userId))
        }
    }, [history.location.pathname, me, dispatch])

    useEffect(() => {
        refreshProfile();
    }, [history.location.pathname, refreshProfile])

    const onSubmit = async (value: ValueT) => {
        debugger
        editSubmitting(true)
        let payload: ProfileT = {
            userId: profile.userId,
            fullName: value.fullName,
            aboutMe: value.aboutMe,
            lookingForAJob: value.lookingForAJob === undefined ? false : value.lookingForAJob,
            lookingForAJobDescription: value.lookingForAJobDescription,
            photos: {...profile.photos},
            contacts: {
                facebook: value.facebook,
                github: value.github,
                vk: value.vk,
                instagram: value.instagram,
                mainLink: value.mainLink,
                twitter: value.twitter,
                website: value.website,
                youtube: value.youtube
            }
        }
        await dispatch(updateProfileInfo(payload))
        editSubmitting(false)
        if (!errorMessages) {
            toggleProfileDataEditMode(false)
        }
    }

    return (
        <>
            {!isFetching
                ? <Row>
                    <Col span={5}>
                        {isProfilePhotoUpdating
                            ? <MySpin size={"large"}/>
                            : <MyAvatar src={profile.photos.small} width={'100%'}/>}
                    </Col>
                    <Col span={19}>{isProfileDataEditModeOn
                        ? <Form name={'profile-form'} onFinish={onSubmit}>
                            <Col>
                                <Row>
                                    <Col span={12}>
                                        <ProfileInfoForm submitting={submitting} profile={profile}
                                                         status={status}
                                                         updateStatus={updateStatusWrapper}
                                                         profileDataEditMode={isProfileDataEditModeOn}
                                                         aboutMe={profile.aboutMe}
                                                        fullName={profile.fullName}
                                                        lookingForAJob={profile.lookingForAJob}
                                                        lookingForAJobDescription={profile.lookingForAJobDescription}
                                                        isOwner={isOwner}/>
                                    </Col>
                                    <Col span={12}>
                                        <ContactsForm submitting={submitting} contacts={profile.contacts}/>
                                    </Col>
                                </Row>
                                <Row className={s.buttons}>
                                    <Button className='button' type={'primary'} htmlType={"submit"} disabled={submitting}>Save
                                        Changes
                                    </Button>
                                </Row>
                                {errorMessages ? <span className={s.error}>{errorMessages.map(e =>
                                    <span key={e}>{e}<br/></span>)}</span> : null}
                            </Col>
                        </Form>
                        : <Col>
                            <Row>
                                <Col span={12}><ProfileInfo isOwner={isOwner} profile={profile} status={status}
                                                            updateStatus={updateStatusWrapper}
                                                            profileDataEditMode={isProfileDataEditModeOn}/>
                                </Col>
                                <Col span={12}>
                                    <Contacts contacts={profile.contacts}
                                              profileDataEditMode={isProfileDataEditModeOn}/>
                                </Col>
                            </Row>
                            <Row justify={"end"}>
                                {isOwner
                                    ? <div className={s.buttons}>
                                        {!isProfileDataEditModeOn ? <Button type={"primary"} onClick={() => {
                                                toggleProfileDataEditMode(true)
                                            }}>Edit Profile Info</Button> :
                                            <Button className='button'>Save Changes</Button>}
                                        <Button type={"primary"} onClick={imitateClickOnInp}>Update Profile Photo
                                        </Button>
                                        <input style={{display: 'none'}} ref={inpRef} type={'file'}
                                               onChange={onProfilePhotoSelected}/>
                                    </div>
                                    : null}
                            </Row>
                        </Col>}
                    </Col>
                </Row>
                : <MySpin size={"large"}/>}
        </>

    )
}

export default Profile