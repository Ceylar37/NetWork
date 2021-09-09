import React, {useEffect} from 'react'
import './App.scss'
import 'antd/dist/antd.css';
import {useDispatch, useSelector} from "react-redux";
import {getInitialize, getIsAuthorised} from "./selectors/auth-selector";
import {initializeApp} from "./store/reducers/appReducer";
import {Link, useHistory} from 'react-router-dom';
import {Breadcrumb, Button, Layout, Menu} from 'antd';
import ContentNavigation from "./components/Content/ContentNavigation";
import {logout} from "./store/reducers/authReducer";

const {Header, Footer, Content} = Layout;


const App: React.FC = () => {

    const initialized = useSelector(getInitialize)
    const isAuth = useSelector(getIsAuthorised)
    const dispatch = useDispatch()
    const history = useHistory()
    if (history.location.pathname === '/') history.push('profile')

    useEffect(() => {
        dispatch(initializeApp())
    }, [dispatch])

    if (!initialized) {
        return <></>
    }

    return (
            <Layout className="layout" style={{minWidth: '859px'}}>
                <Header>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[history.location.pathname]}
                          style={{height: '100%'}}>
                        <Menu.Item key={'/profile'}>
                            <Link to={'/profile'}>
                                Profile
                            </Link>
                        </Menu.Item>
                        <Menu.Item key={'/users'}>
                            <Link to={'/users'}>
                                Users
                            </Link>
                        </Menu.Item>
                        <Menu.Item key={'/chat'}>
                            <Link to={'/chat'}>
                                Chat
                            </Link>
                        </Menu.Item>
                        <Menu.Item key={'/settings'}>
                            <Link to={'/settings'}>
                                Settings
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Header>
                <Content style={{padding: '0 50px', paddingTop: '50px'}}>
                    <div className="site-layout-content">
                        <ContentNavigation/>
                    </div>
                </Content>
                <Footer>
                    {isAuth ? <div style={{display: 'flex', justifyContent: 'flex-end'}}><Button onClick={() => {
                            dispatch(logout())
                        }} type={'primary'}>Logout</Button></div>
                        : <div style={{display: "flex", justifyContent: "center"}}><span>Social Network</span></div>}
                </Footer>
            </Layout>
    )
}

export default App