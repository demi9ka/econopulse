export type ICalculatorData = ICalculatorItem[]

export interface ICalculatorItem {
    data: { id: number | null; action_id: number | null | undefined }[]
    color: string
    name: string
    reverse: boolean
    roc: boolean
    overlay: boolean
}
export interface IChartData {
    labels: string[]
    datasets: {
        label: string
        data: (null | number)[]
        borderColor: string
    }[]
}
