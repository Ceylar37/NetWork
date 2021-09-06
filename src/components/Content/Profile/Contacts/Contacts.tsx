import React from 'react'
import s from './Contacts.module.scss'
import {ContactsT} from "../../../../types/ProfileTypes"

type PropsT = {
    contacts: ContactsT,
    profileDataEditMode: boolean
}

const Contacts: React.FC<PropsT> = (props) => {

    let contactsKeys = Object.keys(props.contacts)

    return (
        <strong className={s.contactsWrapper}>
            {contactsKeys.some((key: string) => {
                return props.contacts[key as keyof ContactsT]
            }) ? <span className={s.label}>Contacts: </span> : null}
            {contactsKeys.map((key: string) => {
                if (props.contacts[key as keyof ContactsT]) {
                    return <span key={key}>{key} : {props.contacts[key as keyof ContactsT]}</span>
                } else {
                    return null
                }
            })}
        </strong>
    )
}

export default Contacts