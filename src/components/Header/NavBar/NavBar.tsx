import React from 'react'
import {NavLink} from "react-router-dom"
import s from './NavBar.module.scss'

const NavBar = () => {
    return (
        <div className={s.navBarWrapper}>
            <NavLink to={'/profile'}><h3>Profile</h3></NavLink>
            <NavLink to={'/users'}><h3>Users</h3></NavLink>
            <a><h3>Settings</h3></a>
        </div>
    )
}

export default NavBar