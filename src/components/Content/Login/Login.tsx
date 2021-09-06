import React from "react"
import {Field, Form} from 'react-final-form'
import {useDispatch, useSelector} from "react-redux"
import {Redirect} from 'react-router'
import {login} from "../../../store/reducers/authReducer";
import {getCaptchaUrl, getErrorMessage, getIsAuthorised} from "../../../selectors/auth-selector";
import s from './Login.module.scss'


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

const Login: React.FC = () => {

    const dispatch = useDispatch()

    const errorMessage = useSelector(getErrorMessage)
    const isAuthorised = useSelector(getIsAuthorised)
    const captchaUrl = useSelector(getCaptchaUrl)

    const onSubmit = async (formData: FormData) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
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
                             <img src={captchaUrl} alt={'Captcha'}/><br/>
                             Please, enter the characters from the picture
                             <Field component={"input"} name={'captcha'} />
                         </div>}
                         {errorMessage ? <div>
                             {errorMessage}
                         </div> : null}
                         <div>
                             <button className='button' type={"submit"} disabled={submitting}>Login</button>
                         </div>
                     </form>)}
    />
}

export default Login