import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.thecatapi.com/v1/',
    headers: {
        'x-api-key': 'ff4a6110-aa04-4808-864f-f42f6864a423'
    }
})

const sub_id = 'Maks_KaNDeR'

export const imagesAPI = {
    getImages: (pageLimit = 15, currentPage = 0) =>
        instance.get<CatType[]>(`images/search?limit=${pageLimit}&page=${currentPage}&order=DESC`),

    getYourFavourites: (pageLimit = 15, currentPage?: number) =>
        instance.get<CatFavoriteType[]>(`favourites?limit=${pageLimit}&page=${currentPage}&sub_id=${sub_id}&order=DESC`),

    unfavourites: (favourite_id: number) => instance.delete(`favourites/${favourite_id}`),

    favourites: (image_id: string) => instance.post(`favourites`, {
        image_id: image_id,
        sub_id: sub_id
    }),

}


export type CatType = {
    breeds: never[]
    height: number
    id: string
    url: string
    width: number
}

export type CatFavoriteType = {
    created_at: string
    id: number 
    image: {
        id: string
        url: string 
    }
    image_id: string
    sub_id: string 
    user_id: string 
}

