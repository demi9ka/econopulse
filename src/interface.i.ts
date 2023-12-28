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
export interface IChartData {
    labels: string[]
    datasets: {
        label: string
        data: (null | number)[]
        borderColor: string
    }[]
}
