import React from 'react'
import {Nullable} from "../../../types/GlobalTypes"
import s from './TopProfileLink.module.scss'

type PropsT = {
    profileImg: Nullable<string>
    logout: () => Promise<void>
    isAuthorised: boolean
}

const TopProfileLink: React.FC<PropsT> = (props) => {
    return (
        <div className={s.topProfileLinkWrapper}>
            {props.isAuthorised
                ? <div>
                    <img
                        src={props.profileImg ? props.profileImg : "https://zohowebstatic.com/sites/default/files/ogimage/people-logo.png"}/>
                    <button onClick={props.logout}>Logout</button>
                </div>
                : null}
        </div>
    )
}

export default TopProfileLink