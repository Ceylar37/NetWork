import React, {useEffect} from 'react'
import './App.scss'
import 'antd/dist/antd.css';
import {useDispatch, useSelector} from "react-redux";
import {getInitialize} from "./selectors/auth-selector";
import {initializeApp} from "./store/reducers/appReducer";
import {Link, NavLink, useHistory} from 'react-router-dom';
import {Layout, Menu, Breadcrumb} from 'antd';
import ContentNavigation from "./components/Content/ContentNavigation";

const {Header, Footer, Content} = Layout;


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
        <Layout className="layout">
            <Header>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} style={{height: '100%'}}>
                    <Menu.Item key={1}>
                        <Link to={'/profile'}>
                            Profile
                        </Link>
                    </Menu.Item>
                    <Menu.Item key={2}>
                        <Link to={'/users'}>
                            Users
                        </Link>
                    </Menu.Item>
                    <Menu.Item key={3}>
                        <Link to={'/settings'}>
                            Settings
                        </Link>
                    </Menu.Item>
                </Menu>
            </Header>
            <Content style={{padding: '0 50px'}}>
                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-content">
                    <ContentNavigation/>
                </div>
            </Content>
            <Footer style={{textAlign: 'center'}}>Social Network</Footer>
        </Layout>
    )
}

export default App