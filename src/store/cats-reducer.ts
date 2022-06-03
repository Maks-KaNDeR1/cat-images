import { Dispatch } from "redux";
import { CatType, imagesAPI } from "../api/api";

let initialState = {
    images: [] as CatDomainType[],
    pageLimit: 15,
    currentPage: 0,
};


export type CatsReducerType = typeof initialState

export const catsReducer = (state: CatsReducerType = initialState, action: ActionsType): CatsReducerType => {
    switch (action.type) {
        case 'SET_IMAGES': {
            return { ...state, images: [...action.images].map(c => ({ ...c, favorites: false })) }
        }
        case 'SET_CURRENT_PAGE': {
            return { ...state, currentPage: action.currentPage }
        }
        case 'TOGGLE_FAVOURITES': {
            return {
                ...state,
                images: state.images.map(i => {
                    if (i.id === action.imageId) {
                        return { ...i, favorites: !i.favorites }
                    }
                    return i
                })
            }
        }
        default:
            return state;
    }
};



type SetImagesType = ReturnType<typeof setImages>
export const setImages = (images: CatType[]) =>
    ({ type: 'SET_IMAGES', images } as const)

type SetCurrentPageType = ReturnType<typeof setCurrentPage>
export const setCurrentPage = (currentPage: number) =>
    ({ type: 'SET_CURRENT_PAGE', currentPage } as const)

type ToggleFavouritesType = ReturnType<typeof toggleFavourites>
export const toggleFavourites = (imageId: string) =>
    ({ type: 'TOGGLE_FAVOURITES', imageId } as const)



export const requestImages = (pageLimit: number, currentPage: number) => async (dispatch: Dispatch) => {
    dispatch(setCurrentPage(currentPage))
    const res = await imagesAPI.getImages(pageLimit, currentPage)
    dispatch(setImages(res.data));
}

export const favourites = (imageId: string) => async (dispatch: Dispatch) => {
    const res = await imagesAPI.favourites(imageId)
    if (res.data.message === 'SUCCESS') {
        dispatch(toggleFavourites(imageId))
    }
}


type ActionsType = SetImagesType | SetCurrentPageType | ToggleFavouritesType

type FavouritesType = true | false
export type CatDomainType = CatType & {
    favorites: FavouritesType
}

