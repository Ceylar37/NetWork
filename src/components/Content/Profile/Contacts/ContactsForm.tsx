import React from 'react'
import s from "./Contacts.module.scss"
import {ContactsT} from "../../../../types/ProfileTypes"
import {Col, Form, Input, Row} from "antd";

type PropsT = {
    contacts: ContactsT
    submitting: boolean
}

const ContactsForm: React.FC<PropsT> = (props) => {
    return (
        <strong className={s.contactsWrapper}>
            <span className={s.label}>Contacts:</span>
            {Object.keys(props.contacts).map((key: string) => {
                console.log(props.contacts[key as keyof ContactsT])
                return <Form.Item label={key} initialValue={props.contacts[key as keyof ContactsT]} name={key} key={key}>
                    <Input disabled={props.submitting} placeholder={key}/>
                </Form.Item>
            })}
        </strong>
    )
}

export default ContactsForm