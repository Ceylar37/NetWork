import React from 'react';
import {Field, Form} from "react-final-form";
import s from './UsersSearchForm.module.scss'
import {useDispatch} from "react-redux";
import {changeFiltersAndRequestUsers} from "../../../../store/reducers/usersReducer";
import {FilterT} from "../../../../types/UsersTypes";

type ValuesT = {
    username: string
    isFollowed: string
}

type PropsT = {
    pageSize: number,
    currentPage: number,
    filter: FilterT
}



const UsersSearchForm: React.FC<PropsT> = (props) => {

    const dispatch = useDispatch()

    let onSubmit = (values: ValuesT) => {
        let isFriend: boolean | null
        switch (values.isFollowed) {
            case 'null':
                isFriend = null
                break
            case 'false':
                isFriend = false
                break;
            case 'true':
                isFriend = true
                break
            default:
                isFriend = null
        }
        dispatch(changeFiltersAndRequestUsers(props.pageSize, {term: values.username, followed: isFriend}))
    }

    return (
        <div>
            <Form
                initialValues={{
                    username: props.filter.term,
                    isFollowed: props.filter.followed
                }}
                onSubmit={onSubmit}
                render={({ handleSubmit, form, submitting, pristine, values }) => (
                    <form className={s.form} onSubmit={handleSubmit}>
                        <div>
                            <Field
                                name="username"
                                component="input"
                                type="text"
                                placeholder="Enter username here"
                            />
                            <Field style={{backgroundColor: '#333333'}} name="isFollowed" component="select">
                                <option value='null'>All</option>
                                <option value='true'>Followed</option>
                                <option value='false'>Unfollowed</option>
                            </Field>
                        </div>
                            <button className='button' type="submit" disabled={submitting}>
                                Find
                            </button>
                    </form>
                )}
            />
        </div>
    );
};

export default UsersSearchForm;