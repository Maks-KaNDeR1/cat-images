import { Dispatch } from "redux";
import { CatFavoriteType, imagesAPI } from "../api/api";

let initialState = {
    images: [] as FavouriteDomainType[],
    pageLimit: 15,
    currentPage: 0,
};

export type FavoritesCatsReducerType = typeof initialState

export const FavoritesCatsReducer = (state: FavoritesCatsReducerType = initialState, action: ActionsType): FavoritesCatsReducerType => {
    switch (action.type) {
        case 'SET_FAVORITES_IMAGES': {
            return {
                ...state, images: [...action.images]
                    .map(c => ({ ...c, favorites: true }))
            }
      }
        case 'SET_CURRENT_PAGE': {
            return { ...state, currentPage: action.currentPage }
        }
        case 'TOGGLE_FAVOURITES': {
            return {
                ...state,
                images: state.images.map(i => {
                    if (i.id === action.favourite_id) {
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


type SetFavouritesImagesType = ReturnType<typeof setFavouritesImages>
export const setFavouritesImages = (images: CatFavoriteType[]) =>
    ({ type: 'SET_FAVORITES_IMAGES', images } as const)

type SetCurrentPageType = ReturnType<typeof setCurrentPage>
export const setCurrentPage = (currentPage: number) =>
    ({ type: 'SET_CURRENT_PAGE', currentPage } as const)

type ToggleFavouritesType = ReturnType<typeof toggleFavourites>
export const toggleFavourites = (favourite_id: number) =>
    ({ type: 'TOGGLE_FAVOURITES', favourite_id } as const)



export const requestFavouritesImages = (pageLimit: number, currentPage: number) => async (dispatch: Dispatch) => {
    dispatch(setCurrentPage(currentPage));
    const res = await imagesAPI.getYourFavourites(pageLimit, currentPage)
    dispatch(setFavouritesImages(res.data));
}

export const unfavourites = (favourite_id: number) => async (dispatch: Dispatch) => {
    const res = await imagesAPI.unfavourites(favourite_id)
    if (res.data.message === 'SUCCESS') {
        dispatch(toggleFavourites(favourite_id))
    }
}


type ActionsType = SetFavouritesImagesType | SetCurrentPageType | ToggleFavouritesType

type FavouriteType = boolean
export type FavouriteDomainType = CatFavoriteType & {
    favorites: FavouriteType
}
