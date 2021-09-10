import React, {useEffect, useState} from 'react'
import {Input} from "antd"
import {useDispatch, useSelector} from "react-redux";
import {getStatus} from "../../selectors/profile-selectors";
import {updateStatus} from "../../store/reducers/profileReducer";

type PropsT = {
    isOwner: boolean,
}

const Status: React.FC<PropsT> = ({isOwner}) => {

    const dispatch = useDispatch()
    const status = useSelector(getStatus)
    const [tempStatus, editTempStatus] = useState<string>(status)
    let [statusEditMode, toggleStatusEditMode] = useState<boolean>(false)

    const onStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        editTempStatus(e.currentTarget.value)
    }

    useEffect(() => {
        editTempStatus(status)
    }, [status])

    const onStatusInputBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
        if (tempStatus !== status) {
            e.currentTarget.disabled = true
            await dispatch(updateStatus(tempStatus))
            toggleStatusEditMode(false)
        } else {
            toggleStatusEditMode(false)
        }
    }

    return (
        <>{isOwner ? (!statusEditMode ? <span onDoubleClick={() => {
                        toggleStatusEditMode(true)
                    }}>Status: {status}</span> :
                    <Input autoFocus={true} onChange={onStatusChange} onBlur={onStatusInputBlur} type="text"
                           value={tempStatus}/>)
                : <span>Status: {status}</span>
        }</>
    )
}

export default Status