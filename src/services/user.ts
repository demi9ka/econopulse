import { AxiosResponse } from 'axios'
import axios from './axios'

type IForm = Record<string, any>
export const postLogin = async (form_data: IForm): Promise<AxiosResponse> => {
    try {
        const res = await axios.post('/api/user/login', form_data)
        return res
    } catch (e: any) {
        throw e.response.data.message
    }
}
export const postRegister = async (form_data: IForm): Promise<AxiosResponse> => {
    try {
        const res = await axios.post('/api/user/register', form_data)
        return res
    } catch (e: any) {
        throw e.response.data.message
    }
}
export const getUser = async (): Promise<AxiosResponse> => {
    try {
        const jwt = localStorage.getItem('JWT')
        const res = await axios.get('/api/user/current', {
            headers: {
                Authorization: 'Bearer ' + jwt,
            },
        })
        return res
    } catch (e: any) {
        throw e.response.data.message
    }
}
