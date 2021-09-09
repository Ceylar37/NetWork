import React, {CSSProperties} from 'react'
import {Spin} from "antd"
import s from './MySpin.module.scss'
type PropsT = {
    size?: "small" | "default" | "large",
    style?: CSSProperties
}

const MySpin: React.FC<PropsT> = ({size, style}) => {
    return (
        <div className={s.mySpin}>
            <Spin size={size} style={style}/>
        </div>
    )
}

export default MySpin