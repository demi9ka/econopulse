import { IChart } from 'interface'
import { makeAutoObservable } from 'mobx'
import defaultChartData from 'services/defaultChartData'

class ChartStore {
    chart: IChart = {
        datasets: [],
        labels: [],
    }
    is_loaded = false
    constructor() {
        makeAutoObservable(this)
    }
    loadDefaultChart = async (): Promise<string | void> => {
        try {
            const res = await defaultChartData()
            this.chart = res
        } catch (e: any) {
            return e.response.message.data
        }
    }
    setChart = (data: IChart) => (this.chart = data)
}

export default new ChartStore()
