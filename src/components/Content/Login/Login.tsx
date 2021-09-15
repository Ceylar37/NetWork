import React, {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {Redirect} from 'react-router'
import {getCaptchaUrl, getErrorMessage, getIsAuthorised} from "../../../selectors/auth-selector";
import {Button, Checkbox, Form, Input, message, Space} from "antd";
import {authActions, login} from "../../../store/slice-reducers/authReducer";


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
            dispatch(authActions.setError({errorMessage: null}))
        }
    }, [errorMessage])

    const onSubmit = async (formData: FormData) => {
        dispatch(login({
            email: formData.email,
            password: formData.password,
            rememberMe: formData.rememberMe === undefined ? false : formData.rememberMe,
            captcha: formData.captcha || undefined
        }))
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