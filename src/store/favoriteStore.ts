import { IFavoriteItem } from 'interface'
import { makeAutoObservable } from 'mobx'

type IFavorite = IFavoriteItem[]
class FavoriteStore {
    favorite: IFavorite = []
    cache: IFavorite = []
    is_loaded = false
    is_error = false
    modal_open = false

    constructor() {
        makeAutoObservable(this)
    }

    setCache = (data: IFavorite) => {
        this.cache = data
    }
    setFavorite = (data: IFavorite) => {
        this.favorite = data
    }
    addFavorite = (item: IFavoriteItem) => {
        this.favorite.push(item)
    }
    deleteFavorite = (id: number) => {
        this.favorite = this.favorite.filter((_, item_id) => item_id !== id)
    }
    addCache = (item: IFavoriteItem) => {
        this.cache.push(item)
    }
    deleteCache = (id: number) => {
        this.cache = this.cache.filter((_, item_id) => item_id !== id)
    }
    setOpen = (value: boolean) => {
        this.modal_open = value
    }
}
export default new FavoriteStore()
