export type IStructure = {
    crop_id: number
    type: null | 'roc' | 'overlay'
    data: IModel[]
}

export interface IStructureFavorite {
    crop_id: number | null
    type: null | 'roc' | 'overlay'
    data: Omit<IModel, 'color' | 'name'>[]
}
export interface IFavoriteItem {
    id: number
    name: string
    data: IStructureFavorite
}

export interface IModel {
    data: string
    color: string
    reverse: boolean
}

export interface IChart {
    labels: string[]
    datasets: {
        label: string
        data: (null | number)[]
        borderColor: string
    }[]
}

export interface IIndex {
    data: {
        id: number
        short_name: string
        long_name: string
        premium: boolean
    }[]
    group: [string, number[]][]
}
