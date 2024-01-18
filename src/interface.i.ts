export type ICalculatorData = {
    crop_id: number | null
    type: null | 'roc' | 'overlay'
    data: ICalculatorItem[]
}

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
