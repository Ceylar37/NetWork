import React, {useRef, useState} from 'react'
import {ContactsT, ProfileT} from "../../../types/ProfileTypes"
import s from './Profile.module.scss'
import ProfileInfo from "./ProfileInfo/ProfileInfo"
import Contacts from "./Contacts/Contacts"
import {Form} from 'react-final-form'
import ProfileInfoForm from "./ProfileInfo/ProfileInfoForm"
import ContactsForm from "./Contacts/ContactsForm"

type PropsT = {
    profile: ProfileT
    status: string,
    isOwner: boolean

    updateProfilePhoto: (image: File) => Promise<void>
    updateProfileInfo: (profile: ProfileT) => Promise<0 | Array<string>>
    updateStatus: (status: string) => Promise<void>
}

type ValueT = {
    aboutMe: string,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string
} & ContactsT

const Profile: React.FC<PropsT> = (props) => {

    const [isProfilePhotoUpdating, editIsProfilePhotoUpdating] = useState<boolean>(false)
    const [isProfileDataEditModeOn, toggleProfileDataEditMode] = useState<boolean>(false)
    const inpRef = useRef<HTMLInputElement>(null)

    let errors: 0 | Array<string> = 0

    const imitateClickOnInp = () => {
        if (inpRef.current) {
            inpRef.current.click()
        }
    }

    const onProfilePhotoSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target?.files?.length) {
            editIsProfilePhotoUpdating(true)
            await props.updateProfilePhoto(e.target.files[0])
            editIsProfilePhotoUpdating(false)
        }
    }

    const onSubmit = async (value: ValueT) => {
        let payload: ProfileT = {
            userId: props.profile.userId,
            fullName: value.fullName,
            aboutMe: value.aboutMe,
            lookingForAJob: value.lookingForAJob,
            lookingForAJobDescription: value.lookingForAJobDescription,
            photos: {...props.profile.photos},
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
        errors = await props.updateProfileInfo(payload)
        if (!errors) {
            toggleProfileDataEditMode(false)
        }
    }

    return (

        <div className={s.profileWrapper}>

            <div className={s.profileDataWrapper}>
                <img
                    src={props.profile.photos.large ? props.profile.photos.large : "https://zohowebstatic.com/sites/default/files/ogimage/people-logo.png"}
                    className={s.profileImg}/>
                {isProfileDataEditModeOn
                    ? <Form onSubmit={onSubmit}
                            initialValues={{
                                fullName: props.profile.fullName,
                                aboutMe: props.profile.aboutMe,
                                lookingForAJob: props.profile.lookingForAJob,
                                lookingForAJobDescription: props.profile.lookingForAJobDescription,
                                ...props.profile.contacts
                            }}
                            render={({handleSubmit, form, submitting, pristine, values}) => (
                                <form onSubmit={handleSubmit}>
                                    <div className={s.innerProfileData}>
                                        <div className={s.profileData}>
                                            <ProfileInfoForm submitting={submitting} profile={props.profile}
                                                             status={props.status}
                                                             updateStatus={props.updateStatus}
                                                             profileDataEditMode={isProfileDataEditModeOn}/>
                                            <ContactsForm submitting={submitting} contacts={props.profile.contacts}/>
                                        </div>
                                        <div className={s.buttons}>
                                            <button type={'submit'} disabled={submitting}>Save Changes</button>
                                        </div>
                                        {errors ? <span className={s.error}>{errors.map(e =>
                                            <span>{e}<br/></span>)}</span> : null}
                                    </div>
                                </form>
                            )}
                    /> : <div className={s.innerProfileData}>
                        <div className={s.profileData}>
                            <ProfileInfo isOwner={props.isOwner} profile={props.profile} status={props.status}
                                         updateStatus={props.updateStatus}
                                         profileDataEditMode={isProfileDataEditModeOn}/>
                            <Contacts contacts={props.profile.contacts} profileDataEditMode={isProfileDataEditModeOn}/>
                        </div>
                        {props.isOwner
                            ? <div className={s.buttons}>
                                {!isProfileDataEditModeOn ? <button onClick={() => {
                                    toggleProfileDataEditMode(true)
                                }}>Edit Profile Info</button> : <button>Save Changes</button>}
                                <button onClick={imitateClickOnInp}>Update Profile Photo</button>
                                <input ref={inpRef} type={'file'}/>
                            </div>
                            : null}
                    </div>}
            </div>
        </div>
    )
}

export default Profile