import React from 'react'
import {Button, Col, Form, Input, Row} from "antd";
import {useDispatch} from "react-redux";
import {sendMessage} from "../../../../store/reducers/ChatReducer";

const MessageForm:React.FC = () => {

    const dispatch = useDispatch()

    const onSubmit = (value: {message: string}) => {
        if (value.message) {
            dispatch(sendMessage(value.message))
        }
    }

    return (
        <Form layout={'horizontal'} name={'chatMessageForm'} onFinish={onSubmit} autoComplete={'off'}>
            <Row justify={'end'}>
                <Col span={22}>
                    <Form.Item name={'message'}>
                        <Input.TextArea placeholder={'Enter message text'}/>
                    </Form.Item>
                </Col>
                <Col span={2}>
                    <Form.Item>
                        <Button style={{width: '100%'}} type={'primary'} htmlType={'submit'}>
                            Send
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}

export default MessageForm