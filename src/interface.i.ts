export type ICalculatorData = {
    crop_id: number | null
    type: null | 'roc' | 'overlay'
    data: ICalculatorItem[]
}
export interface ICalculatorFavoriteData {
    crop_id: number | null
    type: null | 'roc' | 'overlay'
    data: Omit<ICalculatorItem, 'color' | 'name'>[]
}
export interface IFavoriteItem {
    id: number
    name: string
    data: ICalculatorFavoriteData
    create_date: Date
}
export type IFavoriteData = IFavoriteItem[] | null | undefined
//undefined - загрузка
//null - ошибка загрузки

export interface ICalculatorItem {
    data: { id: number | null; action_id: number | null | undefined }[]
    color: string
    name: string
    reverse: boolean
}
export type IChartData = {
    labels: string[]
    datasets: {
        label: string
        data: (null | number)[]
        borderColor: string
    }[]
} | null
export type IUserData =
    | {
          name: string
          email: string
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
