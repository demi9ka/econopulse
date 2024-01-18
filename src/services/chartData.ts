import { AxiosResponse } from 'axios'
import axios from './axios'
import { ICalculatorData } from 'interface'

export default async (calculation_data: ICalculatorData): Promise<AxiosResponse> => {
    try {
        const res = await axios.post('/api/chart_data', calculation_data, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('JWT') || null,
            },
        })
        return res
    } catch (e: any) {
        throw e.response.data.message
    }
}
