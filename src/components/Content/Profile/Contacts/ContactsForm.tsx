import React from 'react'
import s from "./Contacts.module.scss"
import {ContactsT} from "../../../../types/ProfileTypes"
import { Field } from 'react-final-form'

type PropsT = {
    contacts: ContactsT
    submitting: boolean
}

const ContactsForm: React.FC<PropsT> = (props) => {
    return (
        <strong className={s.contactsWrapper}>
            <span className={s.label}>Contacts:</span>
            {Object.keys(props.contacts).map((key: string) => (
                <span>
                    {key}:
                    <Field disabled={props.submitting} name={key} component={'input'} type={'text'} placeholder={key}/>
                </span>))}
        </strong>
    )
}

export default ContactsForm