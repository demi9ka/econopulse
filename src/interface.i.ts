export type IStructure = {
    crop_id: number | null
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
export type IFavorite = IFavoriteItem[] | null | undefined
//undefined - загрузка
//null - ошибка загрузки

export interface IModel {
    data: string
    color: string
    name: string
    reverse: boolean
}

export type IChart = {
    labels: string[]
    datasets: {
        label: string
        data: (null | number)[]
        borderColor: string
    }[]
} | null
export type IUser =
    | {
          name: string
          register_date: Date
      }
    | null
    | undefined

export interface IError {
    content: JSX.Element
}

export type IIndex =
    | {
          data: {
              id: number
              short_name: string
              long_name: string
              premium: boolean
          }[]
          group: [string, number[]][]
          action: string[]
      }
    | null
    | undefined
