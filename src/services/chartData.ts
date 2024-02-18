import { AxiosResponse } from 'axios'
import axios from './axios'
import { IStructure } from 'interface'

export default async (structure: IStructure): Promise<AxiosResponse> => {
    try {
        const res = await axios.post('/api/chart_data', structure, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('JWT') || null,
            },
        })
        return res
    } catch (e: any) {
        throw e.response.data.message
    }
}
