import React from 'react';
import NavBar from "./NavBar/NavBar";
import TopProfileLink from "./TopProfileLink/TopProfileLink";
import s from './Header.module.scss'
import {Nullable} from "../../types/GlobalTypes";

type PropsT = {
    profileImg: Nullable<string>
    logout: () => Promise<void>
    isAuthorised: boolean
}

const Header: React.FC<PropsT> = (props) => {
    return (
        <div>
            <header className={s.headerWrapper}>
                <TopProfileLink profileImg={props.profileImg} logout={props.logout} isAuthorised={props.isAuthorised}/>
                <NavBar/>
            </header>
        </div>
    );
};

export default Header;