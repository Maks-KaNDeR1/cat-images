import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FavoritesCatsReducerType, requestFavouritesImages, unfavourites } from '../store/favourites-cats-reducer';
import { AppRootStateType } from '../store/store';
import s from './FavouriteCats.module.css'
import { FaSyncAlt } from "react-icons/fa";

export const FavouriteCats = () => {

    const cats = useSelector<AppRootStateType, FavoritesCatsReducerType>(state => state.favoritesCats)
    const dispatch = useDispatch<any>()

    const onPageChanged = () => {
        if (cats.images.length >= cats.pageLimit) {
            const currentPage = cats.currentPage + 1
            dispatch(requestFavouritesImages(cats.pageLimit, currentPage))
        }
        if (cats.images.length < cats.pageLimit) {
            const currentPage = 0
            dispatch(requestFavouritesImages(cats.pageLimit, currentPage))
        }
    }


    const onUnfavouritesChenged = (id: number) => {
        dispatch(unfavourites(id))
    }

    useEffect(() => {
        const { pageLimit, currentPage } = cats

        dispatch(requestFavouritesImages(pageLimit, currentPage))
    }, [dispatch])


    return <div>
        <button className={s.butMore} onClick={onPageChanged} >
            <span className={s.butMoreContent} >
               <i><FaSyncAlt /></i>
                 MORE KITTIES
            </span>
        </button>

        <div className={s.imagesBlock} >
            {
                cats.images.map(c => <div className={s.block} >
                    <img key={c.id} className={s.images} src={c.image.url} alt='' />
                    {
                        c.favorites ? <span onClick={() => onUnfavouritesChenged(c.id)}> 🧡 </span>
                            : <span></span>
                    }
                </div>
                )
            }
        </div>
    </div>
}