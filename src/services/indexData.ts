import { AxiosResponse } from 'axios'
import axios from './axios'

export const indexData = async (): Promise<AxiosResponse> => {
    try {
        const res = await axios.get('/api/index_data')
        return res
    } catch (e: any) {
        throw e.response.data.message
    }
}
export const updateDate = async (): Promise<AxiosResponse> => {
    try {
        const res = await axios.get('/api/update_date')
        return res
    } catch (e: any) {
        throw e.response.data.message
    }
}
