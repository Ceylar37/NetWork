import React, {useEffect} from 'react'
import Content from "./components/Content/Content"
import Footer from "./components/Footer/Footer"
import './App.scss'
import {useDispatch, useSelector} from "react-redux";
import {getInitialize} from "./selectors/auth-selector";
import {initializeApp} from "./store/reducers/appReducer";
import HeaderContainer from "./components/Header/HeaderContainer";
import { useHistory } from 'react-router-dom';

const App: React.FC = () => {

    const initialized = useSelector(getInitialize)
    const dispatch = useDispatch()
    const history = useHistory()
    if (history.location.pathname === '/') history.push('profile')

    useEffect(() => {
        dispatch(initializeApp())
    }, [])

    if (!initialized) {
        return <></>
    }

    return (
        <div className={"appWrapper"}>
            <HeaderContainer/>
            <Content/>
            <Footer/>
        </div>
    )
}

export default App