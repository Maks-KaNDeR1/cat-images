import React, { useEffect } from 'react';
import { CatsReducerType, favourites, requestImages } from '../store/cats-reducer';
import { Paginator } from '../common/Paginator/Paginator';
import s from './Cats.module.css';
import { useDispatch, useSelector } from 'react-redux'
import { AppRootStateType } from '../store/store';


export const Cats = () => {

    const cats = useSelector<AppRootStateType, CatsReducerType>(state => state.cats)
    const dispatch = useDispatch<any>()

    const onPageChanged = (pageNumber: number) => {
        dispatch(requestImages(cats.pageLimit, pageNumber))
    }

    const onFavouritesChenged = (id: string) => {
        dispatch(favourites(id))
    }

    useEffect(() => {
        const { pageLimit, currentPage } = cats
        dispatch(requestImages(pageLimit, currentPage))
    }, [])

    const totalImagesCount = 11169

    return <div>

        <Paginator pageSize={cats.pageLimit} currentPage={cats.currentPage}
            totalItemsCount={totalImagesCount} onPageChanged={onPageChanged}
        />

        <div className={s.imagesBlock} >
            {
                cats.images.map(c => <div className={s.block}>
                    <img key={c.id} className={s.images} src={c.url} alt='' />
                    {
                        !c.favorites ? <span onClick={() => onFavouritesChenged(c.id)}> 🤍 </span>
                            : <div> 🧡 </div>
                    }
                </div>)
            }
        </div>
    </div>
}