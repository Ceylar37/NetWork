import React from 'react'
import {useDispatch} from "react-redux"
import {FilterT} from "../../../../types/UsersTypes"
import {Button, Form, Input, Select} from "antd";
import {changeFiltersAndRequestUsers} from "../../../../store/slice-reducers/usersReducer";

const {Item} = Form

type ValuesT = {
    username: string
    isFollowed: 'followed' | 'unfollowed' | 'null'
}

type PropsT = {
    pageSize: number,
    currentPage: number,
    filter: FilterT
}


const UsersSearchForm: React.FC<PropsT> = (props) => {

    const dispatch = useDispatch()

    let onSubmit = (values: ValuesT) => {
        debugger
        dispatch(changeFiltersAndRequestUsers({pageSize: props.pageSize, filter: {term: values.username, followed: values.isFollowed}}))
    }

    return (
        <Form style={{padding: '20px'}} name={'users-search-form'} onFinish={onSubmit}>
            <Input.Group compact>
                <Form.Item name={'username'} initialValue={props.filter.term}>
                    <Input placeholder={'Enter username'} style={{height: '32px'}}/>
                </Form.Item>
                <Form.Item name={'isFollowed'} initialValue={props.filter.followed}>
                    <Select style={{minWidth: '145px'}}>
                        <Select.Option value={'null'}>All</Select.Option>
                        <Select.Option value={'followed'}>Only Friends</Select.Option>
                        <Select.Option value={'unfollowed'}>Only not Friends</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type={'primary'} htmlType={"submit"}>Find</Button>
                </Form.Item>
            </Input.Group>
        </Form>
    )
}

export default UsersSearchForm