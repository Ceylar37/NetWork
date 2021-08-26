import React, {useEffect, useRef, useState} from 'react'
import {ContactsT, ProfileT} from "../../../types/ProfileTypes"
import s from './Profile.module.scss'
import ProfileInfo from "./ProfileInfo/ProfileInfo"
import Contacts from "./Contacts/Contacts"
import {Form} from 'react-final-form'
import ProfileInfoForm from "./ProfileInfo/ProfileInfoForm"
import ContactsForm from "./Contacts/ContactsForm"
import Preloader from "../../common/Preloader/Preloader";
import {useDispatch, useSelector} from "react-redux";
import {
    getProfileIsFetching,
    getProfile,
    getProfileErrorMessages,
    getStatus
} from "../../../selectors/profile-selectors";
import {
    requestStatus,
    setProfileData,
    updateProfileInfo,
    updateProfilePhoto,
    updateStatus
} from "../../../store/reducers/profileReducer";
import {getMyId} from "../../../selectors/auth-selector";
import {useHistory} from 'react-router-dom'
import {Button, Col, Row} from "antd";

type ValueT = {
    aboutMe: string,
    lookingForAJob: boolean,
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

    const refreshProfile = () => {
        let userId: number | null = Number(history.location.pathname) || me;
        if (userId) {
            dispatch(setProfileData(userId))
            dispatch(requestStatus(userId))
        }
    }

    useEffect(() => {
        refreshProfile();
    }, [history.location.pathname])

    const onSubmit = async (value: ValueT) => {
        let payload: ProfileT = {
            userId: profile.userId,
            fullName: value.fullName,
            aboutMe: value.aboutMe,
            lookingForAJob: value.lookingForAJob,
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
        dispatch(updateProfileInfo(payload))
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
                            ? <Preloader/>
                            : <img
                                src={profile.photos.large ? profile.photos.large : "https://zohowebstatic.com/sites/default/files/ogimage/people-logo.png"}
                                className={s.profileImg}/>
                        }
                    </Col>
                    <Col span={19}>{isProfileDataEditModeOn
                        ? <Form onSubmit={onSubmit}
                                initialValues={{
                                    fullName: profile.fullName,
                                    aboutMe: profile.aboutMe,
                                    lookingForAJob: profile.lookingForAJob,
                                    lookingForAJobDescription: profile.lookingForAJobDescription,
                                    ...profile.contacts
                                }}
                                render={({handleSubmit, form, submitting, pristine, values}) => (
                                    <form onSubmit={handleSubmit}>
                                        <div className={s.innerProfileData}>
                                            <div className={s.profileData}>
                                                <ProfileInfoForm submitting={submitting} profile={profile}
                                                                 status={status}
                                                                 updateStatus={updateStatusWrapper}
                                                                 profileDataEditMode={isProfileDataEditModeOn}/>
                                                <ContactsForm submitting={submitting} contacts={profile.contacts}/>
                                            </div>
                                            <div className={s.buttons}>
                                                <button className='button' type={'submit'} disabled={submitting}>Save
                                                    Changes
                                                </button>
                                            </div>
                                            {errorMessages ? <span className={s.error}>{errorMessages.map(e =>
                                                <span>{e}<br/></span>)}</span> : null}
                                        </div>
                                    </form>
                                )}
                        /> : <Col>
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
                            <Row>
                                {isOwner
                                    ? <div className={s.buttons}>
                                        {!isProfileDataEditModeOn ? <Button type={"primary"} onClick={() => {
                                                toggleProfileDataEditMode(true)
                                            }}>Edit Profile Info</Button> :
                                            <Button className='button'>Save Changes</Button>}
                                        <Button type={"primary"} onClick={imitateClickOnInp}>Update Profile Photo
                                        </Button>
                                        <input style={{display: 'none'}} ref={inpRef} type={'file'} onChange={onProfilePhotoSelected}/>
                                    </div>
                                    : null}
                            </Row>
                        </Col>}
                    </Col>
                </Row>
                : <Preloader/>}
        </>

    )
}

export default Profile