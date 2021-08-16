import React from 'react';
import {Field, Form} from "react-final-form";
import s from './UsersSearchForm.module.scss'
import {FilterT} from "../../../../types/UsersTypes";

type ValuesT = {
    username: string
    isFollowed: string
}

type PropsT = {
    pageSize: number,
    currentPage: number,

    changeFiltersAndRequestUsers: (pageSize:number, payload: FilterT) => Promise<void>
}

const UsersSearchForm: React.FC<PropsT> = (props) => {

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
        props.changeFiltersAndRequestUsers(props.pageSize, {term: values.username, friend: isFriend})
    }

    return (
        <div>
            <Form
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