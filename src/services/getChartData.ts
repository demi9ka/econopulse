import axios from './axios'
import { ICalculatorData, IChartData } from 'interface'

export default async (calculation_data: ICalculatorData): Promise<IChartData> => {
    const res = (await axios.post('/api/get_chart_data', calculation_data)).data as IChartData
    return res
}
