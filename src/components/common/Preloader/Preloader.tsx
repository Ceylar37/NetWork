import React from 'react';
import s from './Preloader.module.scss'

const Preloader = () => {
    return (
        <div className={s.preloaderWrapper}>
            <div className={s.loader}></div>
        </div>
    )
}

export default Preloader;