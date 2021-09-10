import React, {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {Redirect} from 'react-router'
import {authActions, login} from "../../../store/reducers/authReducer";
import {getCaptchaUrl, getErrorMessage, getIsAuthorised} from "../../../selectors/auth-selector";
import {Button, Checkbox, Form, Input, message, Space} from "antd";


type Errors = {
    email?: string,
    password?: string,
}

type FormData = {
    email: string,
    password: string,
    rememberMe?: boolean,
    captcha: string | null
}

const Login: React.FC = () => {

    const dispatch = useDispatch()

    const errorMessage = useSelector(getErrorMessage)
    const isAuthorised = useSelector(getIsAuthorised)
    const captchaUrl = useSelector(getCaptchaUrl)

    useEffect(() => {
        if (errorMessage) {
            message.error(errorMessage)
            dispatch(authActions.setError(null))
        }
    }, [errorMessage])

    const onSubmit = async (formData: FormData) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe === undefined ? false : formData.rememberMe, formData.captcha))
    }
    if (isAuthorised) {
        return <Redirect to={'/profile'}/>
    }

    return <Form name={'login-form'} onFinish={onSubmit}>
        <Form.Item name={'email'} rules={[{required: true, message: 'Email is required'}]}>
            <Input placeholder={'Email'}/>
        </Form.Item>
        <Form.Item name={'password'} rules={[{required: true, message: 'Password is required'}, {min: 6, message: 'Password is too short'}]}>
            <Input placeholder={'Password'} type={'password'}/>
        </Form.Item>
        <Form.Item name={'rememberMe'} valuePropName="checked">
            <Checkbox>
                Remember Me
            </Checkbox>
        </Form.Item>
        {captchaUrl &&
            <Space>
                <img src={captchaUrl} alt={'captcha'}/>
        <Form.Item name={'captcha'} rules={[{required: true, message: 'Captcha is required'}]}>
            <Input placeholder={'Captcha'}/>
        </Form.Item>
            </Space>}
        <Form.Item>
            <Button type={'primary'} htmlType={'submit'}>Login</Button>
        </Form.Item>
    </Form>
}

export default Login