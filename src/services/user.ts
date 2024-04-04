import axios from './axios'

type IForm = Record<string, any>
export const postLogin = async (form_data: IForm) => {
    return (await axios.post('/api/user/login', form_data)).data
}
export const postRegister = async (form_data: IForm) => {
    return (await axios.post('/api/user/register', form_data)).data
}
export const currentUser = async () => {
    return (await axios.get<{ name: string }>('/api/user/current')).data
}
