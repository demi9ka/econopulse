import { AxiosResponse } from 'axios'
import axios from './axios'
import { ICalculatorData } from 'interface'

export const deleteFavorite = async (id: number): Promise<AxiosResponse> => {
    try {
        const res = await axios.delete('/api/delete_favorite', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('JWT') || null,
            },
            data: { id },
        })
        return res
    } catch (e: any) {
        throw e.response.data.message
    }
}

export const createFavorite = async (name: string, data: ICalculatorData): Promise<AxiosResponse> => {
    try {
        const res = await axios.post(
            '/api/create_favorite',
            {
                name,
                data,
            },
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('JWT') || null,
                },
            }
        )
        return res
    } catch (e: any) {
        throw e.response.data.message
    }
}

export const getFavorite = async (): Promise<AxiosResponse> => {
    try {
        const res = await axios.get('/api/get_favorite', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('JWT') || null,
            },
        })
        return res
    } catch (e: any) {
        throw e.response.data.message
    }
}
