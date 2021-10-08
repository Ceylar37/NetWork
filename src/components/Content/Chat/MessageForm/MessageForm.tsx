import React from 'react'
import {Button, Col, Form, Input, Row} from "antd";
import {useDispatch} from "react-redux";
import {sendMessage} from "../../../../store/slice-reducers/chatReducer";

const MessageForm:React.FC = () => {

    const dispatch = useDispatch()

    const onSubmit = (value: {message: string}) => {
        if (value.message) {
            dispatch(sendMessage(value.message))
        }
    }

    return (
        <Form layout={'horizontal'} name={'chatMessageForm'} onFinish={onSubmit} autoComplete={'off'} style={{height: '32px'}}>
            <Row justify={'end'} style={{height: '32px'}}>
                <Col style={{height: '32px', flex: 1}}>
                    <Form.Item name={'message'} style={{flex: 1}}>
                        <Input.TextArea autoSize={true} placeholder={'Enter message text'} style={{height: '32px', width: '100%'}}/>
                    </Form.Item>
                </Col>
                <Col style={{height: '32px'}}>
                    <Form.Item>
                        <Button style={{width: '100%', height: '32px'}} type={'primary'} htmlType={'submit'} >
                            Send
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}

export default MessageForm