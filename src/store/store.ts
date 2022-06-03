import thunk from 'redux-thunk';
import {applyMiddleware, combineReducers, createStore} from 'redux'
import { catsReducer } from './cats-reducer'
import { FavoritesCatsReducer } from './favourites-cats-reducer';

export const rootReducer = combineReducers({
    cats: catsReducer,
    favoritesCats: FavoritesCatsReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk))
// @ts-ignore
window.store = store
