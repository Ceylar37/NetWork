import React from 'react'
import {Nullable} from "../../../types/GlobalTypes";
import defaultProfileImageSrc from "../../../images/default_profile_image.png"
import s from './MyAvatar.module.scss'

type StylesT = {
    height?: string,
    width?: string,
    borderRadius?: string
}

type PropsT = {
    src?: Nullable<string>,
} & StylesT

const MyAvatar: React.FC<PropsT> = ({src, height, width, borderRadius}) => {

    const styles: StylesT = {}
    if (height) styles.height = height
    if (width) styles.width = width
    if (borderRadius) styles.borderRadius = borderRadius

    if (!src) return <img className={s.avatarImg} style={styles} src={defaultProfileImageSrc} alt={'Avatar'}/>
    return <img className={s.avatarImg} src={src} style={styles} alt={'Avatar'}/>
}

export default MyAvatar