
import React, { useState } from 'react'
import styles from './Paginator.module.css';
import cn from "classnames";

type PaginatorPropsType = {
    pageSize: number
    totalItemsCount: number
    onPageChanged: (pageNumber: number) => void
    currentPage?: number
    portionSize?: number
}
export const Paginator: React.FC<PaginatorPropsType> = (
    {
        pageSize, totalItemsCount, onPageChanged,
        currentPage, portionSize = 10,
    }
) => {

    let pagesCount = Math.ceil(totalItemsCount / pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    

    return <div className={cn(styles.paginator)}>
        <button className={styles.buttonPrev}
        style={{opacity:  portionNumber < 2 ? '0.4' : ''}}
            disabled={portionNumber < 2}
            onClick={() => { setPortionNumber(portionNumber - 1) }}
        >
           {'<'}
        </button>
        {pages
            .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map(p => {
                return <button className={ cn({
                    [styles.selectedPage]: currentPage === p
                }, styles.pageNumber) }
                    key={p}
                    onClick={(e) => {
                        onPageChanged(p);
                    }}>{p}</button>
            })}
        <button className={styles.buttonNext}
        style={{opacity:  portionCount < portionNumber + 1 ? '0.4' : ''}}
            disabled={portionCount < portionNumber + 1}
            onClick={() => { setPortionNumber(portionNumber + 1) }}
        >
            {'>'}
        </button>
    </div>
}

