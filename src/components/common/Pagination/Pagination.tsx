import React from 'react';
import s from './Pagination.module.scss'

type PropsT = {
    totalCount: number | null,
    pageSize: number,
    currentPortion: number,
    currentPage: number,

    setCurrentPage: (currentPage: number) => void,
    onPageChanged: () => void,
    changeCurrentPortion: (change: number) => void,
}

const Pagination: React.FC<PropsT> = (props) => {
    let pages: Array<number> = [];
    let maxPage: number = 0
    let curMax: number = 0
    if (props.totalCount != null) {
        maxPage = Math.ceil(props.totalCount / props.pageSize);
        curMax = Math.min((props.currentPortion - 1) * 10 + 10, maxPage)
        for (let i = (props.currentPortion - 1) * 10 + 1; i <= curMax; i++)
            pages.push(i);
    }
    return (<div className={s.paginationWrapper}>
        <span>
            {(props.currentPortion !== 1)
                ? <button onClick={() => {props.changeCurrentPortion(-1)}}>previous</button>
                : null}
            {pages.map((page:number) => {
                return <button onClick={() => {
                    props.setCurrentPage(page);
                }}>{page}</button>
            })}
            {(curMax <= maxPage)
                ? <button onClick={() => {props.changeCurrentPortion(1);}}>next</button>
                : null}
            </span>
        </div>
    )
}

export default Pagination;