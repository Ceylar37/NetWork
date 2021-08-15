import React, {useEffect} from 'react'
import Content from "./components/Content/Content"
import Footer from "./components/Footer/Footer"
import './App.scss'
import {connect, ConnectedProps} from "react-redux";
import {RootStateT} from "./types/GlobalTypes";
import {getInitialize} from "./selectors/auth-selector";
import {initializeApp} from "./store/reducers/appReducer";
import HeaderContainer from "./components/Header/HeaderContainer";

type PropsFromRedux = ConnectedProps<typeof connector>

type OwnPropsT = {}

type PropsT = OwnPropsT & PropsFromRedux

const App: React.FC<PropsT> = (props) => {

    useEffect(() => {
        props.initializeApp()
    }, [])

    if (!props.initialized) {
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

const connector = connect((state: RootStateT) => ({
    initialized: getInitialize(state),
}), {initializeApp})

export default connector(App)