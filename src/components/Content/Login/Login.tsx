import React from "react"
import {useDispatch, useSelector} from "react-redux"
import {Redirect} from 'react-router'
import {login} from "../../../store/reducers/authReducer";
import {getCaptchaUrl, getErrorMessage, getIsAuthorised} from "../../../selectors/auth-selector";
import {Button, Checkbox, Form, Input} from "antd";


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

    const onSubmit = async (formData: FormData) => {
        debugger
        dispatch(login(formData.email, formData.password, formData.rememberMe === undefined ? false : formData.rememberMe, formData.captcha))
    }
    if (isAuthorised) {
        return <Redirect to={'/profile'}/>
    }

    return <Form name={'login-form'} onFinish={onSubmit}>
        <Form.Item name={'email'} rules={[{required: true, message: 'Email is required', min: 6}]}>
            <Input placeholder={'Email'}/>
        </Form.Item>
        <Form.Item name={'password'} rules={[{required: true, message: 'Password is required', min: 6}]}>
            <Input placeholder={'Password'} type={'password'}/>
        </Form.Item>
        <Form.Item name={'rememberMe'} valuePropName="checked">
            <Checkbox>
                Remember Me
            </Checkbox>
        </Form.Item>
        {captchaUrl &&
        <Form.Item name={captchaUrl} rules={[{required: true, message: 'Captcha is required'}]}>
            <Input placeholder={'Captcha'}/>
        </Form.Item>}
        <Form.Item>
            <Button type={'primary'} htmlType={'submit'}>Login</Button>
        </Form.Item>
    </Form>
}

export default Login