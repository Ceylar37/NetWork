import React, {useState} from "react"
import { Form, Field } from 'react-final-form'
import {connect, ConnectedProps} from "react-redux"
import {Redirect} from 'react-router'
import {RootStateT} from "../../../types/GlobalTypes";
import {login} from "../../../store/reducers/authReducer";
import {getCaptchaUrl, getIsAuthorised} from "../../../selectors/auth-selector";
import s from './Login.module.scss'

type MapStatePropsT = {
    isAuthorised: boolean,
    captchaUrl: null | string
}

type PropsFromRedux = ConnectedProps<typeof connector>


type Errors = {
    email?: string,
    password?: string,
}

type FormData = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string | null
}

const Login: React.FC<PropsFromRedux> = ({login, isAuthorised, captchaUrl}) => {
    let [error, editError] = useState<number | string>(0)
    const onSubmit = async (formData: FormData) => {
        editError(await login(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }
    if (isAuthorised) {
        return <Redirect to={'/profile'}/>
    }

    return <Form onSubmit={onSubmit}
                 validate={values => {
                     const errors: Errors = {}
                     if (!values.email) {
                         errors.email = 'This field is required'
                     }
                     if (!values.password) {
                         errors.password = 'This field is required'
                     }
                     return errors
                 }}
                 render={({handleSubmit, form, submitting, pristine, values}) => (
                     <form onSubmit={handleSubmit} className={s.loginWrapper}>
                         <Field name="email">
                             {({ input, meta }) => (
                                 <div>
                                     <label>Username</label>
                                     <input {...input} type="text" placeholder="Email" />
                                     {meta.error && meta.touched && <span>{meta.error}</span>}
                                 </div>
                             )}
                         </Field>
                         <Field name="password">
                             {({ input, meta }) => (
                                 <div>
                                     <label>Password</label>
                                     <input {...input} type="password" placeholder="Password" />
                                     {meta.error && meta.touched && <span>{meta.error}</span>}
                                 </div>
                             )}
                         </Field>
                         <div>
                             remember me<Field component={'input'} name={'rememberMe'} type={'checkbox'}/>
                         </div>
                         {captchaUrl && <div>
                             <img src={captchaUrl}/><br/>
                             Please, enter the characters from the picture
                             <Field component={"input"} name={'captcha'} />
                         </div>}
                         {error ? <div>
                             {error}
                         </div> : null}
                         <div>
                             <button type={"submit"} disabled={submitting}>Login</button>
                         </div>
                     </form>)}
    />
}

let mapStateToProps = (state: RootStateT): MapStatePropsT => ({
    isAuthorised: getIsAuthorised(state),
    captchaUrl: getCaptchaUrl(state),
})

const connector = connect(mapStateToProps, {login})

export default connector(Login)